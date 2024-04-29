import express from 'express'
import conn from './src/configs/db.js'


const app = express()

app.get('/', async (req, res) => {
  try {
    const [rows, fields] = await conn.execute('SELECT 1')
    res.json(rows);
  } catch (e) {
    console.error('Error al recuperar los datos', e);
    res.status(500).send('Error interno del servidor');
  }
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})
