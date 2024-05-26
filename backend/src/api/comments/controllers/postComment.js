'use strict'

import { postComment as post } from '../models/index.js'


const postComment = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const { topic_id, description } = req.body

  try {
    const insertId = await post(id, topic_id, description)

    res.status(201).send({
      message: 'Tema creado exitosamente',
      id: insertId
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default postComment
