const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ridegreen',
    password: '914167@Manasa'
});

// console.log(pool , ' connection established');
const promisePool = pool.promise();


module.exports = promisePool;