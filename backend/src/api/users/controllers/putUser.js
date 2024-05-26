'use strict'

import bcrypt from 'bcryptjs'
import { getPayloadToken } from '../../../auth/helpers/index.js'
import { putUser as update } from '../models/index.js'


const putUser = async (req, res) => {
  const { id: aux_id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const id = req.params.id
  const user = req.body
  const { username, password, name } = user

  if (!username || !password || !name) {
    return res.status(400).send({ message: 'Falta informacion' })
  }

  if (aux_id.toString() !== id) {
    return res.status(400).send({ message: 'No se logro editar al Usuario' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 7)
    user.password = hashedPassword
    await update(id, user)

    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default putUser
