'use strict'

import { getTopicById as get } from '../models/index.js'


const getTopicById = async (req, res) => {
  const idTopic = req.params.id

  try {
    const { topic: { author, categories, ...moreInformation },
      comments } = await get(idTopic)
    const parsedComments = comments.map(({ comentator, ...moreInfo }) => {
      return {
        comentator: JSON.parse(comentator),
        ...moreInfo,
      }
    })

    const data = {
      author: JSON.parse(author),
      ...moreInformation,
      categories: JSON.parse(categories),
      comments: parsedComments,
    }

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default getTopicById
