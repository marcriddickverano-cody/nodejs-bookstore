require('dotenv').config();

const Pool = require('pg').Pool

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  port: process.env.DB_PORT || 5433,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "postgres"
})

module.exports = pool;