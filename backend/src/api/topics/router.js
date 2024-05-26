'use strict'

import { Router } from 'express'
import { validate } from '../../auth/middlewares/index.js'
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


topicRouter.use(validate)


topicRouter.post('/', postTopic)
topicRouter.put('/:id', putTopic)
topicRouter.delete('/:id', deleteTopic)

export default topicRouter
