'use strict';

const mysql = require('promise-mysql');

const CONFIG = require('../config.json');
const DB_SOURCE = CONFIG.database;

const DB_HOST = process.env.MYSQL_HOST || DB_SOURCE.host || 'localhost';
const DB_PORT = process.env.MYSQL_PORT || DB_SOURCE.port || 3306;
const DB_USER = process.env.MYSQL_USER || DB_SOURCE.user || 'root';
const DB_PASS = process.env.MYSQL_PASS || DB_SOURCE.password;

let connectionPool;

module.exports = class DB {

	static init(props) {

		let additionalParameters = {
			queryFormat: DB.getMySQLParseMethod('object')
		};

		if (props.printQueries)
			additionalParameters.debug = ['ComQueryPacket'];//, 'RowDataPacket'];

		let connectionOptions = {
			...DB_SOURCE,
			host: DB_HOST,
			port: DB_PORT,
			user: DB_USER,
			password: DB_PASS,
			...additionalParameters
		};

		let pool = mysql.createPool(connectionOptions);

		return pool.getConnection()
			.then(connection => {
				DB.setMySQLPool(pool);
				console.log(`\x1b[33m[mysql]\x1b[39m Connection estabilished with ${DB_SOURCE.host}:${DB_SOURCE.port}`);
				connection.release();
			})
			.catch(err => {
				console.error('\x1b[33m[mysql]\x1b[39m Error connecting (', err.message, ') Trying to connect again in 7 secs...');
				// console.error(err);
				setTimeout(() => {
					DB.init(props);
				}, 7000);
			});
	}

	static getMySQLParseMethod(type) {
		if (type === 'object') {
			return function (query, values) {
				if (!values) return query;
				return query.replace(/\:(\w+)/g, function (txt, key) {
					if (values.hasOwnProperty(key)) {
						return this.escape(values[key]);
					}
					return txt;
				}.bind(this));
			};
		}
	}

	static setMySQLPool(connection) {
		connectionPool = connection;
	}

	/**
	 * @returns {ConnectionPool}
	 */
	static getMySQL() {
		return connectionPool;
	}
};