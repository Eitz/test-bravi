const ResponseCodes = require('./ResponseCodes');
const Validate = require('./Validate');

module.exports = class ErrorResponse {

	constructor(status) {

		if (!Validate.isInteger(status)) {
			status = 400;
		}

		this.status = status;
		this.errors = new Array();
	}

	add(type, extra) {
		let error = {
			code: type,
			text: ResponseCodes.exists(type) ? ResponseCodes.friendly(type) : ResponseCodes.friendly('ERR') + type
		};

		if (error.code.lastIndexOf('FIELD_') != -1) {
			error.field = error.code.substring(error.code.lastIndexOf('FIELD_') + 'FIELD_'.length).toLowerCase();
		}

		extra = extra || {};
		this.errors.push(Object.assign(extra, error));
		return this;
	}

	hasErrors() {
		return this.errors.length > 0;
	}

	/** @override */
	toJSON() {
		return { errors: this.errors };
	}

	/** @override */
	toString() {
		return `Error (${this.status}): ` + this.errors.map(err => `${err.text} (${err.code})`).join(', ');
	}

	/** @override */
	toMessages() {
		return this.errors;
	}

	static fromMySQL(mysqlError) {
		let err = new ErrorResponse();
		err.add(ResponseCodes.createFromMySQL(mysqlError));
		return err;
	}

};