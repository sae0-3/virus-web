'use strict'

import bcrypt from 'bcryptjs'
import conn from '../configs/db.js'


export const createUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 7)

  try {
    const query = 'INSERT INTO `USUARIO` (`username`, `password`, `correo_electronico`, `nombre`, `apellido_paterno`, `apellido_materno`, `foto_perfil`) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const values = Object.values(user)
    const [{ insertId }, _] = await conn.execute(query, values)
    return insertId
  } catch (err) {
    throw new Error(`Error al crear el Usuario: ${err}`)
  }
}

export const loginUser = async (username, password) => {
  try {
    const query = 'SELECT `username`, `password` FROM `USUARIO` WHERE username = ?'
    const [rows, _] = await conn.execute(query, [username])
    let ans = 0

    if (!rows.length) {
      ans = 1
    } else {
      const result = await bcrypt.compare(password, rows[0].password)
      if (!result) {
        ans = 2
      }
    }

    return ans
  } catch (err) {
    throw new Error(`Error al obtener el Usuario: ${err}`)
  }
}
