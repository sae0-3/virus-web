'use strict'

import { getUserAll as get } from '../models/index.js'


const getUserAll = async (_, res) => {
  try {
    const users = await get()
    res.send(users)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export default getUserAll
