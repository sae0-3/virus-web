'use strict'

import { deleteComment as remove } from '../models/index.js'


const deleteComment = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const comment_id = req.params.id

  try {
    await remove(comment_id, id)
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default deleteComment
