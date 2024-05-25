'use strict'

import conn from '../../../core/configs/db.js'


const postTopic = async (user_id, title, description) => {
  const insertContent = `INSERT INTO CONTENT (ID_user, description) VALUES (?, ?)`
  const insertTopic = `INSERT INTO TOPIC (ID, title) VALUES (?, ?)`

  try {
    await conn.beginTransaction()

    const [{ insertId }] = await conn.execute(insertContent, [user_id, description])
    await conn.execute(insertTopic, [insertId, title])

    await conn.commit()
    return insertId
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al publicar el tema')
  }
}

export default postTopic
