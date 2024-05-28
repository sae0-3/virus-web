'use strict'

import conn from '../../../core/configs/db.js'


const getTopicById = async (id) => {
  const queryTopic = `
  SELECT
    title,
    description,
    JSON_OBJECT(
      'id', u.ID,
      'username', username,
      'profile', profile
    ) AS author,
    active,
    COUNT(DISTINCT v.ID) AS views,
    CASE WHEN COUNT(ca.ID) > 0
      THEN JSON_ARRAYAGG(DISTINCT ca.name)
      ELSE JSON_ARRAY()
    END AS categories,
    DATE_FORMAT(c.created_at, '%d-%m-%Y') AS created_at
  FROM TOPIC t
    JOIN CONTENT c ON t.ID = c.ID
    JOIN USER u ON c.ID_user = u.ID
    LEFT JOIN CATEGORY ca ON t.ID = ca.ID_topic
    LEFT JOIN VISUALIZATION v ON t.ID = v.ID_topic
  WHERE t.ID = ?
  GROUP BY t.ID
  `
  const queryComments = `
  SELECT
    c.ID AS id,
    JSON_OBJECT(
      'id', c_co.ID_user,
      'username', username,
      'profile', profile
    ) AS comentator,
    description AS content,
    DATE_FORMAT(c_co.created_at, '%d-%m-%Y') AS commented_at
  FROM TOPIC t
    JOIN COMMENT c ON t.ID = c.ID_topic
    JOIN CONTENT c_co ON c.ID = c_co.ID
    JOIN USER u ON c_co.ID_user = u.ID
  WHERE t.ID = ?
  `

  try {
    const [topicData, commentsData] = await Promise.all([
      conn.execute(queryTopic, [id]),
      conn.execute(queryComments, [id])
    ])

    if (topicData[0].length === 0) {
      throw new Error(`No existe tema con id ${id}`)
    }

    return { topic: topicData[0][0], comments: commentsData[0] }
  } catch (error) {
    throw new Error(`Error al obtener el tema`)
  }
}

export default getTopicById
