'use strict'

import conn from '../../../core/configs/db.js'


const getUserById = async (id) => {
  const getTopics = `
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', t.ID,
      'title', t.title,
      'active', t.active,
      'created_at', DATE_FORMAT(c.created_at, '%Y-%m-%d')
    )
  )
  FROM CONTENT c
    JOIN TOPIC t ON c.ID = t.ID
  WHERE c.ID_user = ?
  `
  const getSaved = `
  SELECT JSON_ARRAYAGG(ID_content)
  FROM SAVE
  WHERE ID_user = ?
  `
  const getInterested = `
  SELECT JSON_ARRAYAGG(ID_content)
  FROM INTERESTE
  WHERE ID_user = ?
  `
  const query = `
  SELECT
    u.ID AS id,
    u.username,
    u.mail,
    u.name,
    u.last_name AS lastname,
    u.second_name AS secondname,
    u.profile,
    DATE_FORMAT(u.created_at, '%Y-%m-%d') AS registered_at,
    COALESCE((${getTopics}), JSON_ARRAY()) AS topics,
    COALESCE((${getSaved}), JSON_ARRAY()) AS saved,
    COALESCE((${getInterested}), JSON_ARRAY()) AS interested
  FROM USER u
  WHERE u.ID = ?
  GROUP BY
    u.ID,
    u.username,
    u.mail,
    u.name,
    u.last_name,
    u.second_name,
    u.profile,
    u.created_at
  `

  try {
    const [users] = await conn.execute(query, [id, id, id, id])

    if (users.length === 0) {
      throw new Error(`No existe tema con id ${id}`)
    }

    return users[0]
  } catch (error) {
    throw new Error(`Error al obtener el usuario`)
  }
}

export default getUserById
