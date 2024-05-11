'use strict'

import 'dotenv/config'
import ServerApiV1 from './src/api/v1/index.js'
import ServerAuth from './src/auth/index.js'


const serverAuth = new ServerAuth(8000)
const serverApiV1 = new ServerApiV1(8080)

serverAuth.listen()
serverApiV1.listen()
