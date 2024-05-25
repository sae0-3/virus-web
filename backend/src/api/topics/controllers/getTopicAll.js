'use strict'

import { getTopicAll as get } from '../models/index.js'


const getTopicAll = async (_, res) => {
  try {
    const topics = await get()
    const data = topics.map(({ author, participants, ...moreInformation }) => {
      return {
        author: JSON.parse(author),
        ...moreInformation,
        participants: JSON.parse(participants),
      }
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default getTopicAll
