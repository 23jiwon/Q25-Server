/*
require('dotenv').config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const password = process.env.DB_PASSWD;
const database = process.env.DB_DATABASE;
*/

const mysql = require('mysql2/promise');
/*
const pool = mysql.createPool({
    host : host,
    user : user,
    port : port,
    password : password,
    database : database
});
*/

// const {logger} = require('./winston');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port : '3306',
    password : '', //비밀번호 
    database : 'christmas25'
});

module.exports = {
    pool : pool
};
