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

    this.app.use('/api/notice', async (req, res) => {
      const URL = 'https://parsehub.com/api/v2/projects/tyqFQRnBW0by/last_ready_run/data?api_key=taEXja38WNOX'

      try {
        const response = await fetch(URL)
        const data = await response.json()

        res.status(200).send(data)
      } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'error' })
      }
    })
  }
}

export default ServerApi
