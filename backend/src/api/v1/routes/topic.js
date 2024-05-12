'use strict'

import { Router } from 'express'
import { getById, getAll, create, remove } from '../controllers/topic.js'


const topicRouter = Router()

topicRouter.get('/:id', getById)
topicRouter.get('/', getAll)

topicRouter.post('/create', create)

topicRouter.delete('/delete/:id', remove)

export default topicRouter
