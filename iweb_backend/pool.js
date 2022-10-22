/*mysql 数据库连接池模块*/

const mysql = require('mysql')


module.exports = mysql.createPool({
	/*连接本地的mysql服务器必须的参数*/
	host: '1.15.186.28',
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'iweb',
	connectionLimit: '10'
})