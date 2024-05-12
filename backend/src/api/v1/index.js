'use strict'

import cors from 'cors'
import Server from '../../configs/server.js'
import topicRouter from './routes/topic.js'
import { validateToken } from './helpers/utilities.js'


class ServerApiV1 extends Server {
  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/v1/topics', validateToken, topicRouter)
  }
}

export default ServerApiV1
