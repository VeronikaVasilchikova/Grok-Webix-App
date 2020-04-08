const mysql = require('mysql2');

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "musicbandsdb",
	password: "JSrac1503hak@"
});

module.exports = pool.promise();