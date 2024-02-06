const mysql = require('mysql2/promise');
require('dotenv').config();

try {
  const db = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Test'
  });
  module.exports = db;
} catch (error) {
  console.log(error);
}
