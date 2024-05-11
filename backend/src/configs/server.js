'use strict'

import express from 'express'
import conn from './db.js'


export default class Server {
  constructor(port) {
    this.app = express()
    this.port = port

    this.connectDB()
    this.app.use(express.json())
    this.middlewares()
    this.routes()
  }

  middlewares() {
    throw new Error('¡Funcion sin implementar!')
  }

  routes() {
    throw new Error('¡Funcion sin implementar!')
  }

  connectDB() {
    conn.connect((err) => {
      if (err) {
        throw new Error(`No se logro conectar con la base de datos: ${err}`)
      } else {
        console.log('¡Base de datos conectada exitosamente!')
      }
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en: http://localhost:${this.port}`)
    })
  }
}
