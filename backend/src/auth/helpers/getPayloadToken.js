'use strict'

import { jwtDecode } from "jwt-decode"


const getPayloadToken = (token) => {
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

export default getPayloadToken
