require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connection has been established successfully!");
    }
});

module.exports = connection