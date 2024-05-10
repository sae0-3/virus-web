'use strict'

import { Router } from 'express'
import { getById, getAll } from '../controllers/topic.js'


const topicRouter = Router()

topicRouter.get('/:id', getById)
topicRouter.get('/', getAll)

export default topicRouter
