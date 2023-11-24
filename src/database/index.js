const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,

});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     require: true,
//   },
// });

// exports.query = async (query, values) => {
//   const client = await pool.connect();
//   try {
//     const { rows } = await client.query(query, values);
//     return rows;
//   } finally {
//     client.release();
//   }
// };
