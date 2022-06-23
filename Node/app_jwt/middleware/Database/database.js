const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

// TODO: 본인 DB 계정 입력
const options = {
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    port: process.env.LOCAL_DB_PORT,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DATABASE,
};

const pool = mysql2.createPool(options);

module.exports = pool
