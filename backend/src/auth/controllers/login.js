'use strict'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getUsers } from '../models/index.js'


const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const users = await getUsers()
    let status = 0

    for (let idx = 0; idx < users.length; idx++) {
      if (users[idx].username === username) {
        status = 1

        if (await bcrypt.compare(password, users[idx].password)) {
          const token = jwt.sign(
            { id: users[idx].id, username },
            process.env.APPLICATION_SECRETKEY,
            { expiresIn: '100000000' }
          )

          return res.status(200).send({ token })
        }
      }
    }

    if (!status) {
      return res.status(404).send({
        message: 'El usuario no existe'
      })
    } else {
      return res.status(401).send({
        message: 'La contraseña y el usuario no coinciden'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Surgio un error en el servidor'
    })
  }
}

export default login
