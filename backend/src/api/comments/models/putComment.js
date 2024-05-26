'use strict'

import conn from '../../../core/configs/db.js'


const putComment = async (id, user_id, description, salient) => {
  const putContent = `UPDATE CONTENT SET description = ? WHERE ID = ? AND ID_user = ?`
  const putComment = `UPDATE COMMENT SET salient = ? WHERE ID = ?`
  const query = `
  SELECT c.ID_user AS id
  FROM COMMENT co
    JOIN CONTENT c ON co.ID = c.ID 
  WHERE co.ID = ?
  `

  try {
    const [result] = await conn.execute(query, [id])

    if (!result.length) {
      throw new Error(`El comentario con id ${id} no existe`)
    }

    if (result[0].id !== user_id) {
      throw new Error(`No es propietario del comentario`)
    }

    await conn.beginTransaction()
    await Promise.all([
      conn.execute(putContent, [description, id, user_id]),
      conn.execute(putComment, [salient, id])
    ])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al actualizar el comentario')
  }
}

export default putComment
