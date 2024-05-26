'use strict'

import conn from '../../../core/configs/db.js'


const getInterested = async (user_id, content_id) => {
  const query = `
  SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date
  FROM INTERESTE
  WHERE ID_content = ? AND ID_user = ?
  `

  try {
    const [result] = await conn.execute(query, [content_id, user_id])
    return !result.length ? null : result[0].date
  } catch (error) {
    throw new Error('Ocurrio un problema')
  }
}

export default getInterested
