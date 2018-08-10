const codes = require('../config/response-codes.json');

module.exports = class ResponseCodes {

	static get all() {
		return codes;
	}

	static friendly(code) {
		if (ResponseCodes.all.hasOwnProperty(code))
			return ResponseCodes.all[code];
		else
			return undefined;
	}

	static exists(code) {
		if (ResponseCodes.all.hasOwnProperty(code)) {
			return true;
		}
		else {
			console.warn(`\x1b[33m[server/warn]\x1b[39m Error message in response-codes.json isn't defined for '${code}'.`);
			return false;
		}
	}

	static getResponseMessage(err) {
		if (err instanceof String)
			return ResponseCodes.getFromJson(err);

		return ResponseCodes.mysqlFriendly(err);
	}

	static createFromMySQL(mysqlError, dontPrintError) {

		if (!mysqlError || !mysqlError.hasOwnProperty('sqlState')) {
			throw new Error('The error especified wasn\'t a mysql error! I Recieved: ' + mysqlError);
		}

		mysqlError.code = mysqlError.code.replace(/_\d+$/, '');
		let matches;
		let key;
		switch (mysqlError.code) {
			case 'ER_DUP_ENTRY':
				matches = mysqlError.message.match(new RegExp(/for key \'(.*?)\'/));
				key = matches ? matches[1] : null;
				return 'ERR_DUPLICATE_ENTRY' + (key ? '_' + key.toUpperCase() : '');
			case 'ER_NO_REFERENCED_ROW':
			case 'ER_ROW_IS_REFERENCED':
				matches = mysqlError.message.match(new RegExp(/CONSTRAINT \`(.*?)\`/));
				key = matches ? matches[1] : null;
				if (!dontPrintError)
					console.log('\x1b[33m[mysql/warn]\x1b[39m ' + mysqlError.message);
				return 'ERR_FOREIGN_KEY_VIOLATION' + (key ? '_' + key.toUpperCase() : '');
			default:
				if (!dontPrintError)
					console.warn(`[\x1b[33m[server/warn]\x1b[39m Error message isn't filtered in ResponseCodes.js for ${mysqlError.code} (${mysqlError.message}).`);
				return undefined;
		}
	}
};