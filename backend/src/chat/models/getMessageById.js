'use strict'

import conn from '../../core/configs/db.js'


const getMessageById = async (id_orig, id_dest) => {
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
    content,
    DATE_FORMAT(date, '%d/%m/%Y') AS date
  FROM MESSAGE m
    JOIN USER uo ON ID_user_origin = uo.ID
    JOIN USER ud ON ID_user_destiny = ud.ID
  WHERE
    (ID_user_origin = ? AND ID_user_destiny = ?)
    OR
    (ID_user_origin = ? AND ID_user_destiny = ?)
  `

  try {
    const [data] = await conn.execute(query, [id_orig, id_dest, id_dest, id_orig])
    const formatedData = data.map(({ origin, destiny, ...moreInfo }) => {
      return {
        ...moreInfo,
        origin: JSON.parse(origin),
        destiny: JSON.parse(destiny),
      }
    })
    return formatedData
  } catch (error) {
    throw new Error('Error al obtener la conversacion')
  }
}

export default getMessageById
