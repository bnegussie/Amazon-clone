// Setting up the DB connection:
const Pool = require("pg").Pool;
require("dotenv").config();

// Connecting the DB and server:
const pool = new Pool({
    user: process.env.dbUser,
    password: process.env.dbPwd,
    host: process.env.dbHost,
    port: process.env.dbPort,
    database: process.env.dbName
});

module.exports = pool;
