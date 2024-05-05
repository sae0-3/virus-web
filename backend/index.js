import express from 'express'
import conn from './src/configs/db.js'


const app = express()

// Middleware para habilitar CORS
app.use((req, res, next) => {
  // Permite que todas las solicitudes de cualquier origen accedan a los recursos del servidor
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Define los métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Define los encabezados permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Continúa con la ejecución de la siguiente función middleware
  next();
});

app.get('/api/v0/temas', async (req, res) => {
  try {
    const query =`
    SELECT
      t.ID as id,
      titulo as title,
      DATE_FORMAT(fecha_publicacion, '%Y-%m-%d') AS create_at,
      COALESCE(COUNT(DISTINCT co.ID), 0) as comments,
      COALESCE(COUNT(DISTINCT v.ID), 0) as views
    FROM TEMA t 
      JOIN CONTENIDO c ON t.ID = c.ID
      JOIN USUARIO u ON c.ID_usuario = u.ID
      LEFT JOIN COMENTARIO co ON t.ID = co.ID_tema
      LEFT JOIN VISUALIZACION v ON t.ID = v.ID_tema
    GROUP BY t.ID, title, desciption, create_at`


    const [rows, _] = await conn.execute(query)
    res.json(rows)
  } catch (e) {
    console.error('Error al recuperar los datos', e)
    res.status(500).send('Error interno del servidor')
  }
})

app.get('/api/v0/tema/:i', async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM TEMA
    WHERE t.ID = ${req.params.i}`

    const [rows, fields] = await conn.execute(query)
    res.json(rows)
  } catch (e) {
    console.error('Error al recuperar los datos', e)
    res.status(404).send('Recurso no encontrado')
  }
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})
