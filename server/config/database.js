
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env')});

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const password = process.env.DB_PASSWD;
const database = process.env.DB_DATABASE;
console.log(database);
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host,
    user,
    port,
    password,
    database
});

// const {logger} = require('./winston');

module.exports = {
    pool : pool
};