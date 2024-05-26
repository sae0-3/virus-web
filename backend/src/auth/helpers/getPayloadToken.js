'use strict'

import { jwtDecode } from "jwt-decode"


const getPayloadToken = (token) => {
  return jwtDecode(token)
}

export default getPayloadToken
