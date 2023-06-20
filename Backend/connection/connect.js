const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = conn;