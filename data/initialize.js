require('dotenv').config();
const mysql = require('mysql2');

const pass = process.env.Password;
console.log(pass);
const pool = mysql.createPool({
    //host: 'switchback.proxy.rlwy.net', 
    host: 'switchyard.proxy.rlwy.net',
    user: 'root',
    //password: 'gdRszbNTxOGUDDecOAePxcrYWouyteCN',
    password:pass,
    database: 'railway',
    //port: 35330,
    port: 40394,
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

