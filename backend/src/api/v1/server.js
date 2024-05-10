'use strict'

import ServerApi from '../server.js'
import cors from 'cors'
import topicRouter from './routes/topic.js'


class ServerApiV1 extends ServerApi {
  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/v1/topics', topicRouter)
  }
}

export default ServerApiV1
