const { Pool } = require('pg');

const pool = new Pool({
    database: 'my_store',
    user: 'cahocyjei',
    password: '1914',
    port: 5432,
    //ssl: true,
    //max: 20, // set pool max size to 20
    //idleTimeoutMillis: 1000, // close idle clients after 1 second
    //connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    //maxUses: 7500, // cl
});

module.exports = pool;