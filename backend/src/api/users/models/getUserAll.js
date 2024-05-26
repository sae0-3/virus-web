'use strict'

import conn from '../../../core/configs/db.js'


const getUserAll = async () => {
  const query = `
  SELECT
    ID AS id,
    username,
    mail,
    name,
    last_name AS lastname,
    second_name AS secondname,
    profile,
    DATE_FORMAT(created_at, '%Y-%m-%d') AS registered_at
  FROM USER
  `

  try {
    const [users] = await conn.execute(query)
    return users
  } catch (error) {
    throw new Error(`Error al obtener los usuarios`)
  }
}

export default getUserAll
