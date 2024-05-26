'use strict'

import cors from 'cors'
import Server from '../core/configs/server.js'
import { login, verify } from './controllers/index.js'
import { validate } from './middlewares/index.js'


export default class ServerAuth extends Server {
  middlewares() {
    this.app.use(cors({
      // origin: '*',
      methods: 'POST'
    }))
  }

  routes() {
    this.app.use('/auth/login', login)
    this.app.use('/auth/verify', validate, verify)
  }
}
