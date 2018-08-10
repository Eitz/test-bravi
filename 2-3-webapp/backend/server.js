'use strict';

// Set Env
const CONFIG = require('./config.json');
process.env.ENV = process.env.ENV || 'development';
process.env.DOMAIN = process.env.DOMAIN || 'localhost:3000';

// Requires
const bdParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const app = express();

app.set('flags', process.argv.map(mapFlags).filter(el => el));

/**
 * @param {String} val 
 */
function mapFlags(val) {
	if (val && val.match('--'))
		return val.replace('--', '');
	else
		return null;
}

console.log(`\n\x1b[33m[server]\x1b[39m Starting up server in <${process.env.ENV}> mode...`);

// Local
const DB = require('./lib/DB');
const Router = require('./router');
const SQLLoader = require('./lib/SQLLoader');

// secret for tokens
const jwtSecret = 'funny lilx dogs';
const port = process.env.PORT || CONFIG.port || 5000;

app.set('secret', jwtSecret);

app.use(compression());
app.use(bdParser.urlencoded({ extended: false }));
app.use(bdParser.json());

let router = new Router(app);
router.setupRoutes();

SQLLoader.cacheQueries()
	.then(() => {
		DB.init({ printQueries: !!app.get('flags').includes('print-queries') })
	})
	.then(() => {
		// Start!
		app.listen(port, function onServerStarted() {
			console.log(`\x1b[33m[server]\x1b[39m Listening on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		throw err;
	});
