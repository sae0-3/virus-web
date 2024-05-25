'use strict'

import { Router } from 'express'
import { validateToken } from '../../auth/middlewares/index.js'
import {
  deleteTopic,
  getTopicAll,
  getTopicById,
  postTopic,
  putTopic
} from './controllers/index.js'


const topicRouter = Router()

topicRouter.get('/:id', getTopicById)
topicRouter.get('/', getTopicAll)


topicRouter.use(validateToken)


topicRouter.post('/', postTopic)
topicRouter.put('/:id', putTopic)
topicRouter.delete('/:id', deleteTopic)

export default topicRouter
