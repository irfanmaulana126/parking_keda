const Pool = require("pg").Pool;
const pool = new Pool({
    user:'postgres', // default postgres
    host:'localhost',
    database:'parking', 
    password:'postgres',
    port:'5433' //default port
});

module.exports = pool;