'use strict'

import { getPayloadToken } from "../helpers/index.js"


const verify = (req, res) => {
  const token = req.headers.authorization.split(' ').pop()
  const { id, username } = getPayloadToken(token)
  res.status(200).send({ id, username })
}

export default verify
