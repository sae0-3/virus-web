'use strict'

import jwt from 'jsonwebtoken'
import { createUser, loginUser } from './models.js'


export const register = async (req, res) => {
  try {
    const userID = await createUser(req.body)
    res.status(201).send({
      message: 'Usuario creado exitosamente',
      id: userID
    })
  } catch (err) {
    res.status(500).send({
      message: 'Error al crear el Usuario',
      id: -1
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await loginUser(username, password)

    if (result === 1) {
      return res.status(404).send({
        message: 'El usuario no existe'
      })
    } else if (result === 2) {
      return res.status(401).send({
        message: 'La contraseña y el usuario no coinciden'
      })
    }

    const token = jwt.sign({ username },
      process.env.APPLICATION_SECRETKEY,
      { expiresIn: '100000000' })

    res.status(200).send({ token })
  } catch (err) {
    res.status(500).send({
      message: 'Error interno del servidor'
    })
  }
}
