'use strict'

import Server from '../configs/server.js'
import router from './routes.js'


export default class ServerAuth extends Server {
  middlewares() {
    
  }

  routes() {
    this.app.use('/auth', router)
  }
}
