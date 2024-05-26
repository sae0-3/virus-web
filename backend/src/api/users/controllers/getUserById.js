'use strict'

import { validateToken } from '../../../auth/helpers/index.js'
import { getUserById as get } from '../models/index.js'


const getUserById = async (req, res) => {
  const id = req.params.id
  const headerAuth = req.headers.authorization
  let aux_id

  if (!headerAuth || !headerAuth.startsWith('Bearer')) {
    aux_id = -1
  } else {
    const user = validateToken(headerAuth.split(' ').pop())
    aux_id = !!user ? user.id : -1
  }

  try {
    const { topics, saved, interested, ...moreInfo } = await get(id)
    const topicsFormated = JSON.parse(topics)
    let savedFomated, interestedFormated

    if (id === aux_id.toString()) {
      savedFomated = JSON.parse(saved)
      interestedFormated = JSON.parse(interested)
    } else {
      savedFomated = null
      interestedFormated = null
    }

    const data = {
      ...moreInfo,
      saved: savedFomated,
      interested: interestedFormated,
      topics: topicsFormated,
    }

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default getUserById
