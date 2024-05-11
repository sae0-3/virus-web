'use strict'

import bcrypt from 'bcryptjs'
import conn from '../configs/db.js'


export const createUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 7)
  const query = 'INSERT INTO `USUARIO` (`username`, `password`, `correo_electronico`,\
    `nombre`, `apellido_paterno`, `apellido_materno`, `foto_perfil`) VALUES (?, ?, ?, ?, ?, ?, ?)'
  const values = Object.values(user)

  try {
    const [{ insertId }, _] = await conn.execute(query, values)
    return insertId
  } catch (err) {
    throw new Error(`Error al crear el Usuario: ${err}`)
  }
}

export const loginUser = async (username, password) => {
  const query = 'SELECT `ID`, `username`, `password` FROM `USUARIO` WHERE username = ?'
  let status = 0
  let id = -1

  try {
    const [rows, _] = await conn.execute(query, [username])

    if (!rows.length) {
      status = 1
    } else {
      const result = await bcrypt.compare(password, rows[0].password)
      if (!result) {
        status = 2
      } else {
        id = result.id
      }
    }

    return { status, id }
  } catch (err) {
    throw new Error(`Error al obtener el Usuario: ${err}`)
  }
}
