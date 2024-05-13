'use strict'

import cors from 'cors'
import Server from '../configs/server.js'
import router from './routes.js'
import { validateToken, getPayloadToken } from '../api/v1/helpers/utilities.js'


export default class ServerAuth extends Server {
  middlewares() {
    this.app.use(cors({
      // origin: '*',
      methods: 'POST'
    }))
  }

  routes() {
    this.app.use('/auth', router)
    this.app.use('/auth/verify', validateToken, (req, res) => {
      const token = req.headers.authorization.split(' ').pop()
      const { id, username } = getPayloadToken(token)
      res.status(200).send({ id, username })
    })
  }
}
