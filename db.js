// db.js

const mysql = require('mysql2');
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10
});

// Function to test the database connection
exports.testConnection = async () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query('SELECT * FROM mycreds360.users', (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
            }
    
            // Return the query results
            console.log(results);
        });
    })
};


