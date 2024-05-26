'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { postSaved as post } from '../models/index.js'


const postSaved = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const content_id = req.params.id

  try {
    await post(id, content_id)
    res.status(201).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default postSaved
