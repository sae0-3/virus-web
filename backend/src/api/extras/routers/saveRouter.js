'use strict'

import { Router } from 'express'
import { getSaved, postSaved } from '../controllers/index.js'


export const saveRouter = Router()

saveRouter.get('/:id', getSaved)
saveRouter.post('/:id', postSaved)

export default saveRouter
