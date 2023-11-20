

const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_climate
});
pool.connect((err) => {
  if (err) {
    console.error(`connection to database : ${proses.env.DB_climate} `, err.stack);
  } else {
    console.log(`connected to database: ${process.env.DB_climate}`);
  }
});

module.exports = pool;