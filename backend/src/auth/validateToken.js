'use strict'

import jwt from 'jsonwebtoken'


const validateToken = (req, res, next) => {
  const headerToken = req.headers.authorization

  if (!headerToken || !headerToken.startsWith('Bearer')) {
    return res.status(400).send({
      message: 'Acceso denegado'
    })
  }

  try {
    const bearerToken = headerToken.split(' ').pop()
    jwt.verify(bearerToken, process.env.APPLICATION_SECRETKEY)
    next()
  } catch (err) {
    res.status(401).send({
      message: 'Token no valido'
    })
  }
}

export default validateToken
