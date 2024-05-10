'use strict'

import 'dotenv/config'
import ServerApiV1 from './src/api/v1/server.js'


const sav1 = new ServerApiV1(8080)

sav1.listen()
