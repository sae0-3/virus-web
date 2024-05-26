'use strict'

import { putComment as update } from '../models/index.js'


const putComment = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const comment_id = req.params.id
  const { description, salient } = req.body

  try {
    await update(comment_id, id, description, salient)
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default putComment
