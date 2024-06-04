'use strict'

import conn from '../../core/configs/db.js'


const getUserByUsername = async (username) => {
  const query = `SELECT ID AS id from USER WHERE username = ?`

  try {
    const [user] = await conn.execute(query, [username])

    if (user.length === 0) {
      throw new Error('No se encontro al usuario')
    }

    return user[0]
  } catch (error) {
    throw new Error('Surgio un error al recuperar al usuario')
  }
}

export default getUserByUsername
