'use strict'

import 'dotenv/config'
import ServerApi from './src/api/serverApi.js'
import ServerAuth from './src/auth/serverAuth.js'
import ServerChat from './src/chat/serverChat.js'


const serverAuth = new ServerAuth(8000)
const serverApi = new ServerApi(8080)
const serverChat = new ServerChat(4000)

serverAuth.listen()
serverApi.listen()
serverChat.listen()
