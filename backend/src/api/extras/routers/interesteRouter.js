'use strict'

import { Router } from 'express'
import { getInterested, postInterested } from '../controllers/index.js'


const interesteRouter = Router()

interesteRouter.get('/:id', getInterested)
interesteRouter.post('/:id', postInterested)

export default interesteRouter
