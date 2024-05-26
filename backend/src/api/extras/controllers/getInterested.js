'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { getInterested as get } from '../models/index.js'


const getInterested = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const content_id = req.params.id

  try {
    const date = await get(id, content_id)

    res.status(200).send({ date })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default getInterested
