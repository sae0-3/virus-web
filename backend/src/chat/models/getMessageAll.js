'use strict'

import conn from '../../core/configs/db.js'


const getMessageAll = async (user_id) => {
  const query = `
  SELECT
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
  WHERE ID_user_origin = ? OR ID_user_destiny = ?
  ORDER BY m.date DESC
  `

  try {
    const [data] = await conn.execute(query, [user_id, user_id])
    const aux = new Set()
    const dataFormated = data.map(({ origin, destiny, ...moreInfo }) => {
      const originParsed = JSON.parse(origin)
      const destinyParsed = JSON.parse(destiny)
      const userFinal = (originParsed.id === user_id) ? destinyParsed : originParsed

      if (aux.has(userFinal.id)) {
        return null
      }

      aux.add(userFinal.id)
      return {
        ...moreInfo,
        user: userFinal,
      }
    })
    return dataFormated.filter((val) => !!val)
  } catch (error) {
    throw new Error('Error al obtener los chats')
  }
}

export default getMessageAll
