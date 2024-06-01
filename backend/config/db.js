const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server host
  user: 'root',      // Replace with your MySQL username
  password: ' ',  // Replace with your MySQL password
  database: 'user_management'    // Replace with your MySQL database name
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

module.exports = connection;
