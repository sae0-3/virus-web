'use strict'

import conn from '../../../core/configs/db.js'


const deleteComment = async (id, user_id) => {
  const delContent = `DELETE FROM CONTENT WHERE ID = ? AND ID_user = ?`
  const query = `
  SELECT c.ID_user AS id
  FROM COMMENT co
    JOIN CONTENT c ON co.ID = c.ID 
  WHERE co.ID = ?
  `

  try {
    const [result] = await conn.execute(query, [id])

    if (!result.length) {
      throw new Error(`El comentario con ${id} no existe`)
    }

    if (result[0].id !== user_id) {
      throw new Error('No es propietario del comentario')
    }

    await conn.beginTransaction()
    await conn.execute(delContent, [id, user_id])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al eliminar el comentario')
  }
}

export default deleteComment
