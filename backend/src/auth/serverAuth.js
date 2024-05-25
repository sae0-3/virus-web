'use strict'

import cors from 'cors'
import Server from '../core/configs/server.js'
import { login } from './controllers/index.js'
import { getPayloadToken } from './helpers/index.js'
import { validateToken } from './middlewares/index.js'


export default class ServerAuth extends Server {
  middlewares() {
    this.app.use(cors({
      // origin: '*',
      methods: 'POST'
    }))
  }

  routes() {
    this.app.use('/auth/login', login)
    this.app.use('/auth/verify', validateToken, (req, res) => {
      const token = req.headers.authorization.split(' ').pop()
      const { id, username } = getPayloadToken(token)
      res.status(200).send({ id, username, token })
    })
  }
}
