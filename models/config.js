// config
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1381.Amiroodi',
    database: 'ig_clone'
});

module.exports = con;
