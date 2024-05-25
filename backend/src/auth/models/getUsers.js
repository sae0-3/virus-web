'use strict'

import conn from '../../core/configs/db.js'


const getUsers = async () => {
  const query = `SELECT id, username, password FROM USER`

  try {
    const [users] = await conn.execute(query)
    return users
  } catch (error) {
    throw new Error('Error al obtener los usuarios')
  }
}

export default getUsers
