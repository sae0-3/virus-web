'use strict'

import 'dotenv/config'
import ServerApi from './src/api/serverApi.js'
import ServerAuth from './src/auth/serverAuth.js'


const serverAuth = new ServerAuth(8000)
const serverApi = new ServerApi(8080)

serverAuth.listen()
serverApi.listen()
