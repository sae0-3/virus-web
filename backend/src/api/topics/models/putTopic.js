'use strict'

import conn from '../../../core/configs/db.js'


const putTopic = async (user_id, topic_id, title, description) => {
  const query = `
  SELECT ID_user 
  FROM TOPIC t
    LEFT JOIN CONTENT c ON t.ID = c.ID
  WHERE t.ID = ?
  `
  const putTopic = `UPDATE TOPIC SET title = ? WHERE ID = ?`
  const putContent = `
  UPDATE CONTENT
  SET description = ?
  WHERE ID = ? AND ID_user = ?`

  try {
    const [result] = await conn.execute(query, [topic_id])

    if (!result.length) {
      throw new Error(`El tema con id ${topic_id} no existe`)
    }

    const { ID_user: author_id } = result[0]
    if (author_id !== user_id) {
      throw new Error(`No es propietario del tema`)
    }

    await conn.beginTransaction()
    await conn.execute(putContent, [description, topic_id, user_id])
    await conn.execute(putTopic, [title, topic_id])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al actualizar el tema')
  }
}

export default putTopic
