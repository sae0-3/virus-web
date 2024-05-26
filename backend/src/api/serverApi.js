'use strict'

import cors from 'cors'
import { validate } from '../auth/middlewares/index.js'
import Server from '../core/configs/server.js'
import commentRouter from './comments/router.js'
import topicRouter from './topics/router.js'
import userRouter from './users/router.js'
import { saveRouter, interesteRouter } from './extras/routers/index.js'


class ServerApi extends Server {
  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/topics', topicRouter)
    this.app.use('/api/users', userRouter)
    this.app.use('/api/comments', commentRouter)
    this.app.use('/api/saved', validate, saveRouter)
    this.app.use('/api/interested', validate, interesteRouter)
  }
}

export default ServerApi
