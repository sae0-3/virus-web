'use strict'

import conn from '../../../core/configs/db.js'


const deleteTopic = async (user_id, topic_id) => {
  const query = `
  SELECT ID_user 
  FROM TOPIC t
    LEFT JOIN CONTENT c ON t.ID = c.ID
  WHERE t.ID = ?
  `
  const deleteTopic = `DELETE FROM TOPIC WHERE ID = ?`
  const deleteContent = `DELETE FROM CONTENT WHERE ID = ? AND ID_user = ?`

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
    await conn.execute(deleteTopic, [topic_id])
    await conn.execute(deleteContent, [topic_id, user_id])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error(`No se logro eliminar el tema`)
  }
}

export default deleteTopic
