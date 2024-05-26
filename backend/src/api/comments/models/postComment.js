'use strict'

import conn from '../../../core/configs/db.js'


const postComment = async (user_id, topic_id, description) => {
  const postContent = `INSERT INTO CONTENT (ID_user, description) VALUES (?, ?)`
  const postComment = `INSERT INTO COMMENT (ID, ID_topic) VALUES (?, ?)`

  try {
    await conn.beginTransaction()

    const [{ insertId }] = await conn.execute(postContent, [user_id, description])
    await conn.execute(postComment, [insertId, topic_id])

    await conn.commit()
    return insertId
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al publicar el comentario')
  }
}

export default postComment
