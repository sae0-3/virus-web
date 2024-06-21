'use strict'

import mysql from 'mysql2/promise'


console.table({
  host: process.env.DATABASE_HOST,
  user: 'root',
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: process.env.MARIADB_DATABASE
})

const connectWithRetry = async (retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: 'root',
        password: process.env.MARIADB_ROOT_PASSWORD,
        database: process.env.MARIADB_DATABASE
      })
      console.log('Connected to MariaDB!')
      return conn
    } catch (err) {
      console.error('Failed to connect to MariaDB, retrying...', err)
      await new Promise(res => setTimeout(res, delay))
    }
  }
  throw new Error('Failed to connect to MariaDB after multiple attempts')
}

const conn = await connectWithRetry()

export default conn
