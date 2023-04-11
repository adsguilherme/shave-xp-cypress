const { Pool } = require('pg') // Importando a Classe Pool

require('dotenv/config')

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  port: 5432 
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
  await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
  const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
  const data = [user.name, user.email, user.password, user.is_shaver]

  const result = await pool.query(sql, data)
  const { id } = result.rows[0]

  return id
}

async function findToken(email) {
  const sql = 'select token from ' +
    'users a INNER JOIN user_tokens b ' +
    'ON a.id = b.user_id where ' +
    'a.email = $1 ' +
    'ORDER BY b.created_at DESC LIMIT 1'

  const result = await pool.query(sql, [email])

  console.log(result.rows[0])

  return result.rows[0]

}

module.exports = {
  deleteUser,
  insertUser,
  findToken
}
