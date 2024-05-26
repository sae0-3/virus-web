'use strict'

import conn from '../../../core/configs/db.js'


const deleteUser = async (id) => {
  const query = `DELETE FROM USER WHERE ID = ?`

  try {
    await conn.beginTransaction()
    await conn.execute(query, [id])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al eliminar el usuario')
  }
}

export default deleteUser
