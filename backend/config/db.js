// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'BayersHealthCare',
  port: 3306 // or 8889 if using MAMP
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('MySQL connection successful!');
  }
});

module.exports = connection;