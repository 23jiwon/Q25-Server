const mysql = require('mysql2/promise');
const {logger} = require('./winston');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port : '3306',
    password : '',
    database : 'christmas25'
});

module.exports = {
    pool : pool
};