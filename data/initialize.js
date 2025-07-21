require('dotenv').config();
const mysql = require('mysql2');

const pass = process.env.PASSWORD;
const pool = mysql.createPool({
    host: 'crossover.proxy.rlwy.net',
    user: 'root',
    password: 'UBWXsfhjxGpyDndtjQLZrxtKlupFXZsO',
    database: 'railway',
    port: 42911,
    ssl: {
        rejectUnauthorized: false
    }
});

// Convert pool to use promises
const promisePool = pool.promise();

promisePool.getConnection()
  .then(() => console.log('Connected to Railway MySQL (Public URL)!'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = promisePool;

