'use strict'

import { Router } from 'express'
import { validate } from '../../auth/middlewares/index.js'
import {
  deleteComment,
  postComment,
  putComment
} from './controllers/index.js'


const commentRouter = Router()


commentRouter.use(validate)


commentRouter.post('/', postComment)
commentRouter.put('/:id', putComment)
commentRouter.delete('/:id', deleteComment)

export default commentRouter
