'use strict'

import cors from 'cors'
import { createServer } from 'node:http'
import { Server as wsServer } from 'socket.io'
import Server from '../core/configs/server.js'
import { getPayloadToken } from '../auth/helpers/index.js'
import {
  getMessage,
  getMessageAll,
  getMessageById,
  getUserByUsername,
  postMessage
} from './models/index.js'
import { validate } from '../auth/middlewares/index.js'


export default class ServerChat extends Server {
  constructor(port) {
    super(port)
    this.server = createServer(this.app)
    this.io = new wsServer(this.server, {
      cors: { origin: '*' }
    })
    this.ws()
  }

  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.use('/chat/:username', validate, async (req, res) => {
      const username = req.params.username

      try {
        const { id } = await getUserByUsername(username)
        res.status(200).send({ id })
      } catch (error) {
        res.status(500).send()
      }
    })
  }

  ws() {
    this.io.on('connection', (socket) => {
      const token = socket.handshake.headers.authorization?.split(' ').pop()
      const data = getPayloadToken(token)

      if (!!data) {
        console.log('Se cargo el token')
        const { id: user_id } = data

        socket.on('client:getAll', async () => {
          try {
            const chats = await getMessageAll(user_id)
            socket.emit('server:getAll', chats)
          } catch (error) {
            console.log('Surgio un problema en el servidor')
          }
        })
  
        socket.on('client:getById', async (id) => {
          try {
            const messages = await getMessageById(user_id, id)
            socket.emit('server:getById', messages)
          } catch (error) {
            console.log('Surgio un problema en el servidor')
          }
        })
  
        socket.on('client:post', async (content, id) => {
          try {
            await postMessage(user_id, id, content)
            socket.emit('server:post', { from: user_id, to: id })
          } catch (error) {
            console.log('Surgio un problema en el servidor')
          }
        })
      } else {
        console.log('No se cargo el token')
      }

    })
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en: http://localhost:${this.port}`)
    })
  }
}
