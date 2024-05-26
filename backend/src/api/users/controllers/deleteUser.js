'use strict'

import { getPayloadToken } from '../../../auth/helpers/index.js'
import { deleteUser as remove } from '../models/index.js'


const deleteUser = async (req, res) => {
  const { id: aux_id } = getPayloadToken(req.headers.authorization.split(' ').pop())
  const id = req.params.id

  if (aux_id.toString() !== id) {
    return res.status(400).send({ message: 'No se logro eliminar el Usuario' })
  }

  try {
    await remove(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default deleteUser
