require('dotenv').config();

const Pool = require('pg').Pool

if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
} else {
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    port: process.env.DB_PORT || 5433,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "postgres"
  });
}

module.exports = pool;