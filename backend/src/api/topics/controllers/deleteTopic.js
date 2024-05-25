'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { deleteTopic as remove } from '../models/index.js'


const deleteTopic = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const topic_id = req.params.id

  try {
    await remove(id, topic_id)
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default deleteTopic
