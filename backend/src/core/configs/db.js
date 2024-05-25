'use strict'

import mysql from 'mysql2/promise'


const conn = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: 'root',
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: process.env.MARIADB_DATABASE
})

export default conn