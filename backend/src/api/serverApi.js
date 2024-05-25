'use strict'

import cors from 'cors'
import Server from '../core/configs/server.js'
import topicRouter from './topics/router.js'
// import userRouter from './users/userRoutes.js'


class ServerApi extends Server {
  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/topics', topicRouter)
    // this.app.use('/api/users', userRouter)
  }
}

export default ServerApi
