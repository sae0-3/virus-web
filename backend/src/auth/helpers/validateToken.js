'use strict'

import jwt from 'jsonwebtoken'
import { getPayloadToken } from './index.js'


const validateToken = (token) => {
  let answer

  try {
    jwt.verify(token, process.env.APPLICATION_SECRETKEY)
    const { id, username } = getPayloadToken(token)
    answer = { id, username }
  } catch (error) {
    answer = null
  }

  return answer
}

export default validateToken
