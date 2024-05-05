import express from 'express'
import conn from './src/configs/db.js'


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/v0/temas', async (req, res) => {
  try {
    const query =`
    SELECT
      t.ID AS id,
      titulo AS title,
      DATE_FORMAT(c.fecha_publicacion, '%Y-%m-%d') AS created_at,
      COALESCE(COUNT(DISTINCT co.ID), 0) AS comments,
      COALESCE(COUNT(DISTINCT v.ID), 0) AS views,
      activo AS active,
      JSON_OBJECT(
        'id', u.ID,
        'name', u.nombre,
        'profile', u.foto_perfil
      ) AS author,
      CASE
        WHEN COUNT(p.ID) > 0 THEN JSON_ARRAYAGG(DISTINCT JSON_OBJECT(
          'id', p.ID,
          'name', p.nombre,
          'profile', p.foto_perfil
        ))
        ELSE JSON_ARRAY()
      END AS participants
    FROM TEMA t 
      JOIN CONTENIDO c ON t.ID = c.ID
      JOIN USUARIO u ON c.ID_usuario = u.ID
      LEFT JOIN COMENTARIO co ON t.ID = co.ID_tema
      LEFT JOIN CONTENIDO c_co ON co.ID = c_co.ID
      LEFT JOIN USUARIO p ON c_co.ID_usuario = p.ID
      LEFT JOIN VISUALIZACION v ON t.ID = v.ID_tema
    GROUP BY id, title, created_at, active`

    const [rows, _] = await conn.execute(query)
    const data = rows.map(({ author, participants, ...vls  }) => {
      return {
        author: JSON.parse(author),
        participants: JSON.parse(participants),
        ...vls
      }
    })
    res.json(data)
  } catch (e) {
    console.error('Error al recuperar los datos', e)
    res.status(500).send('Error interno del servidor')
  }
})

app.get('/api/v0/tema/:id', async (req, res) => {
  try {
    const queryTopic = `
    SELECT
      titulo AS title,
      descripcion AS description,
      JSON_OBJECT(
        'id', u.ID,
        'username', username,
        'profile', foto_perfil
      ) AS author,
      activo AS active,
      COUNT(DISTINCT v.ID) AS views,
      CASE
        WHEN COUNT(ca.ID) > 0 THEN JSON_ARRAYAGG(DISTINCT ca.nombre)
        ELSE JSON_ARRAY()
      END AS categories,
      DATE_FORMAT(c.fecha_publicacion, '%Y-%m-%d') AS created_at
    FROM TEMA t
      JOIN CONTENIDO c ON t.ID = c.ID
      JOIN USUARIO u ON c.ID_usuario = u.ID
      LEFT JOIN R_TEMA_CATEGORIA r_tc ON t.ID = r_tc.ID_tema
      LEFT JOIN CATEGORIA ca ON r_tc.ID_categoria = ca.ID
      LEFT JOIN VISUALIZACION v ON t.ID = v.ID_tema
    WHERE t.ID = ${req.params.id}`

    const queryComments = `
    SELECT
      c.ID AS id,
      JSON_OBJECT(
        'user_id', c_co.ID_usuario,
        'username', username,
        'profile', foto_perfil
      ) AS user,
      descripcion AS content,
      DATE_FORMAT(fecha_publicacion, '%Y-%m-%d') AS commented_at
    FROM TEMA t
      JOIN COMENTARIO c ON t.ID = c.ID_tema
      JOIN CONTENIDO c_co ON c.ID = c_co.ID
      JOIN USUARIO u ON c_co.ID_usuario = u.ID
    WHERE t.ID = ${req.params.id}`

    const [topicData, commentsResult] = await Promise.all([
      conn.execute(queryTopic),
      conn.execute(queryComments)
    ])

    const data = topicData[0][0]
    const comments = commentsResult[0].map(({ user, ...vls }) => {
      return {
        user: JSON.parse(user),
        ...vls
      }
    })

    data.author = JSON.parse(data.author)
    data.categories = JSON.parse(data.categories)
    data.comments = comments
    res.json(data)
  } catch (e) {
    console.error('Error al recuperar los datos', e)
    res.status(404).send('Recurso no encontrado')
  }
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})
