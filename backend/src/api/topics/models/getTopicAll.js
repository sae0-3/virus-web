'use strict'

import conn from '../../../core/configs/db.js'


const getTopicAll = async () => {
  const query = `
  SELECT
    t.ID AS id,
    t.title,
    t.active,
    JSON_OBJECT(
      'id', u.ID,
      'username', u.username,
      'profile', u.profile
    ) AS author,
    DATE_FORMAT(c.created_at, '%d-%m-%Y') AS created_at,
    COALESCE(COUNT(DISTINCT co.ID), 0) AS comments,
    COALESCE(COUNT(DISTINCT v.ID), 0) AS views,
    COALESCE((
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', p.ID,
          'username', p.username,
          'profile', p.profile
        )
      )
      FROM COMMENT co2
      JOIN CONTENT c2 ON co2.ID = c2.ID
      JOIN USER p ON c2.ID_user = p.ID
      WHERE co2.ID_topic = t.ID
    ), JSON_ARRAY()) AS participants
  FROM TOPIC t
    JOIN CONTENT c ON t.ID = c.ID
    JOIN USER u ON c.ID_user = u.ID
    LEFT JOIN COMMENT co ON t.ID = co.ID_topic
    LEFT JOIN VISUALIZATION v ON t.ID = v.ID_topic
    LEFT JOIN CONTENT c_co ON co.ID = c_co.ID
    LEFT JOIN USER p ON c_co.ID_user = p.ID
  GROUP BY
    t.ID,
    t.title,
    t.active,
    u.ID,
    u.username,
    u.profile,
    c.created_at
  ORDER BY c.created_at DESC
  `

  try {
    const [temas] = await conn.execute(query)
    return temas
  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener los temas`)
  }
}

export default getTopicAll
