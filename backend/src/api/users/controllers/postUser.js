'use strict'

import bcrypt from 'bcryptjs'
import { postUser as post } from '../models/index.js'


const postUser = async (req, res) => {
  const user = req.body
  const { username, password, mail, name } = user

  if (!username || !password || !mail || !name) {
    return res.status(400).send({ message: 'Falta informacion' })
  }

  const mailRegex = /^[0-9]+@est\.umss\.edu$/;
  if (!mailRegex.test(mail)) {
    return res.status(400).send({ message: 'Correo no válido' });
  }

  try {
    user.password = await bcrypt.hash(password, 7)
    const insertId = await post(user)

    res.status(201).send({
      message: 'Usuario creado exitosamente',
      id: insertId
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default postUser
