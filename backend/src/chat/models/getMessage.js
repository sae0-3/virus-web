'use strict'

import conn from '../../core/configs/db.js'


const getMessage = async (id) => {
  const query = `SELECT
    m.ID AS id,
    JSON_OBJECT(
      'id', uo.ID,
      'username', uo.username,
      'profile', uo.profile
    ) AS origin,
    JSON_OBJECT(
      'id', ud.ID,
      'username', ud.username,
      'profile', ud.profile
    ) AS destiny,
    DATE_FORMAT(date, '%d/%m/%Y') AS date
  FROM MESSAGE m
    JOIN USER uo ON ID_user_origin = uo.ID
    JOIN USER ud ON ID_user_destiny = ud.ID
  WHERE m.ID = ?
  `

  try {
    const [messages] = await conn.execute(query, [id])
    const formatedData = messages.map(({ origin, destiny, ...moreInfo }) => {
      return {
        ...moreInfo,
        origin: JSON.parse(origin),
        destiny: JSON.parse(destiny),
      }
    })
    return formatedData[0]
  } catch (error) {
    throw new Error('Surgio un error al obtener el mensaje')
  }
}

export default getMessage
