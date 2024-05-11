'use strict'

import cors from 'cors'
import Server from '../configs/server.js'
import router from './routes.js'


export default class ServerAuth extends Server {
  middlewares() {
    this.app.use(cors({
      // origin: '*',
      methods: 'POST'
    }))
  }

  routes() {
    this.app.use('/auth', router)
  }
}
