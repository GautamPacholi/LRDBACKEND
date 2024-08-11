const mysql = require('mysql2/promise'); // Import mysql2 with Promises

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',       // Replace with your MySQL server host
  user: 'root',            // Replace with your MySQL username
  password: '',            // Replace with your MySQL password
  database: 'lrdbackend',  // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;