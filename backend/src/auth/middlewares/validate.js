'use strict'

import { validateToken } from '../helpers/index.js'


const validate = (req, res, next) => {
  const headerToken = req.headers.authorization

  if (!headerToken || !headerToken.startsWith('Bearer')) {
    return res.status(400).send({
      message: 'Acceso denegado'
    })
  }

  const userInfo = validateToken(headerToken.split(' ').pop())

  if (!!userInfo) {
    next()
  } else {
    res.status(401).send({
      message: 'Token no valido'
    })
  }
}

export default validate
