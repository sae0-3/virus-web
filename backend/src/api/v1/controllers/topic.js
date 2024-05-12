'use strict'

import { getPayloadToken } from '../helpers/utilities.js'
import TopicModel from '../models/topic.js'


export const getById = async (req, res) => {
  const idTopic = req.params.id

  try {
    const topic = await TopicModel.getById(idTopic)
    res.status(200).send(topic)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const topics = await TopicModel.getAll()
    res.status(200).send(topics)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const create = async (req, res) => {
  const { id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const { title, data } = req.body

  try {
    const insertId = await TopicModel.create(id, title, data)
    res.status(201).send({
      message: 'Tema creado exitosamente',
      id: insertId
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const remove = async (req, res) => {
  const { id: id_user } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const id_topic = req.params.id

  try {
    await TopicModel.remove(id_user, id_topic)
    res.status(204).send()
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
