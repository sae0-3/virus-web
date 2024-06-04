'use strict'

import conn from '../../core/configs/db.js'


const postMessage = async (id_orig, id_dest, content) => {
  const query = `INSERT INTO MESSAGE (ID_user_origin, ID_user_destiny, content) VALUES (?, ?, ?)`

  try {
    await conn.beginTransaction()
    const [{ insertId }] = await conn.execute(query, [id_orig, id_dest, content])
    await conn.commit()
    return insertId
  } catch (error) {
    await conn.rollback()
    throw new Error('Surgio un problema al enviar el mensaje')
  }
}

export default postMessage
