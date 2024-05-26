'use strict'

import conn from '../../../core/configs/db.js'


const putUser = async (id, user) => {
  const { username, password, name, lastname, secondname, profile } = user

  const query = `
  UPDATE USER SET
    username = ?,
    password = ?,
    name = ?,
    last_name = ?,
    second_name = ?,
    profile = ?
  WHERE ID = ?
  `

  try {
    await conn.beginTransaction()

    await conn.execute(query, [
      username, password, name, 
      lastname || null, secondname || null, profile || null, id
    ])

    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al actualizar el usuario')
  }
}

export default putUser
