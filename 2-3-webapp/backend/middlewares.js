const ErrorResponse = require('./lib/ErrorResponse');
const ResponseCodes = require('./lib/ResponseCodes');

module.exports = class Middlewares {

	static allowCrossdomain(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	}

	static logRequest(req, res, next) {
		let body = JSON.stringify(req.body);
		body = body.replace(/\n/g, ' ');
		if (body == '{}')
			body = '';
		else
			body = ` \x1b[32mbody \x1b[33m${body}\x1b[39m`;
		let params = JSON.stringify(req.params);
		params = params.replace(/\n/g, ' ');
		if (params == '{}')
			params = '';
		else
			params = ` \x1b[32mparams \x1b[33m${params}\x1b[39m`;
		let query = JSON.stringify(req.query);
		query = query.replace(/\n/g, ' ');
		if (query == '{}')
			query = '';
		else
			query = ` \x1b[32mquery \x1b[33m${query}\x1b[39m`;

		let prefix = '';
		if (body || params || query) {
			prefix = '\n\t~';
		}
		console.log(`\x1b[34m[server/request/${req.method.toLowerCase()}]\x1b[39m ${req.originalUrl} ${prefix}${body}${params}${query}`);
		next();
	}

	static errorDispatch(err, req, res, next) {

		if (!err)
			next();

		if (err.stack)
			console.error('\x1b[31m[server/error]\x1b[39m', err.stack);
		else
			console.error('\x1b[31m[server/error]\x1b[39m', err.toString());

		let newError = new ErrorResponse();

		// Validation error
		if (err instanceof ErrorResponse) {
			return res.status(err.status || 400).json(err.toJSON());
		}
		// Handled MySQL Error
		else if (err.hasOwnProperty('sqlState') && ResponseCodes.createFromMySQL(err, true)) {
			throw new Error('Error validation should\'nt recieve mysql \'fixable\' errors. Fix it: call ErrorResponse(template, error, params)');
		}
		// JSON SyntaxError
		else if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			newError.add('ERR_JSON_SYNTAX_ERROR');
			return res.status(400).json(newError.toJSON());
		}
		else {
			newError.add('ERR_SERVER_ERROR');
			return res.status(500).json(newError.toJSON());
		}
	}

	static pageNotFound(req, res) {
		let newError = new ErrorResponse();
		newError.add('ERR_NOT_FOUND');
		return res.status(404).json(newError.toJSON());
	}
};