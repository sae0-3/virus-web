'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { postTopic as post } from '../models/index.js'


const postTopic = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const { title, description } = req.body

  try {
    const insertId = await post(id, title, description)

    res.status(201).send({
      message: 'Tema creado exitosamente',
      id: insertId
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default postTopic
