'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { putTopic as update } from "../models/index.js"


const putTopic = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const topic_id = req.params.id
  const { title, description } = req.body

  try {
    await update(id, topic_id, title, description)
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default putTopic
