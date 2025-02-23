/* const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ridegreen',
    password: '914167@Manasa'
});

// console.log(pool , ' connection established');
const promisePool = pool.promise();


module.exports = promisePool; */

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool(process.env.DATABASE_URL + "?ssl={" + 
  '"rejectUnauthorized":true' + "}");

// Convert pool to use promises
const promisePool = pool.promise();

promisePool.getConnection()
  .then(() => console.log('✅ Connected to Railway MySQL!'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = promisePool;
