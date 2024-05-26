'use strict'

import { Router } from 'express'
import { validate } from '../../auth/middlewares/index.js'
import {
  deleteUser,
  getUserAll,
  getUserById,
  postUser,
  putUser
} from './controllers/index.js'


const userRouter = Router()

userRouter.get('/:id', getUserById)
userRouter.get('/', getUserAll)
userRouter.post('/', postUser)


userRouter.use(validate)


userRouter.put('/:id', putUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
