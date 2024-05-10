'use strict'

import express from 'express'


class ServerApi {
  constructor(port) {
    this.app = express()
    this.port = port

    this.middlewares()
    this.routes()
  }

  middlewares() {
    throw new Error('¡Funcion sin implementar!')
  }

  routes() {
    throw new Error('¡Funcion sin implementar!')
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en: http://localhost:${this.port}`)
    })
  }
}

export default ServerApi
