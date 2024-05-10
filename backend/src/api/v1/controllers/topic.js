'use strict'

import TopicModel from '../models/topic.js'


export const getById = async (req, res) => {
  const idTopic = req.params.id
  try {
    const topic = await TopicModel.getById(idTopic)
    res.json(topic)
  } catch (err) {
    res.status(500).send({ message: 'Error interno del servidor'})
  }
}

export const getAll = async (req, res) => {
  try {
    const topics = await TopicModel.getAll()
    res.json(topics)
  } catch (err) {
    res.status(500).send({ message: 'Error interno del servidor'})
  }
}
