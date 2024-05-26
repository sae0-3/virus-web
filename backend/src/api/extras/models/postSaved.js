'use strict'

import conn from '../../../core/configs/db.js'


const postSaved = async (user_id, content_id) => {
  const aux = `SELECT 1 FROM SAVE WHERE ID_content = ? AND ID_user = ?`

  try {
    const [result] = await conn.execute(aux, [content_id, user_id])
    const saved = result.length !== 0
    const query = saved
      ? 'DELETE FROM SAVE WHERE ID_content = ? AND ID_user = ?'
      : 'INSERT INTO SAVE (ID_content, ID_user) VALUES (?, ?)'

    await conn.beginTransaction()
    await conn.execute(query, [content_id, user_id])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Ocurrio un problema')
  }
}

export default postSaved
