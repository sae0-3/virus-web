'use strict'

import conn from '../../../core/configs/db.js'


const postUser = async (user) => {
  const { username, password, mail, name, lastname, secondname, profile } = user
  const query = `
  INSERT INTO USER (
    username, password, mail, name, last_name, second_name, profile
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  try {
    await conn.beginTransaction()

    const [{ insertId }] = await conn.execute(query, [
      username, password, mail, name,
      lastname || null, secondname || null, profile || null
    ])

    await conn.commit()
    return insertId
  } catch (error) {
    await conn.rollback()
    throw new Error('Error al crear el usuario')
  }
}

export default postUser
