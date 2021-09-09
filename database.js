require('dotenv').config();

const Pool = require('pg').Pool

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "",
  database: "postgres"
})

module.exports = pool;