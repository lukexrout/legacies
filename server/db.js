const Pool = require('pg/lib').Pool

const pool = new Pool({
    user: 'postgres',
    password: '~m]JicG3U3&_8X3$6Yu*{',
    // password: '9eymBnbB&b+!51xmj;(R(',
    host: 'localhost',
    port: 5432,
    database: 'legacies'
})

module.exports = pool