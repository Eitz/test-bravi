const DB = require('../lib/DB');
const SQLLoader = require('../lib/SQLLoader');
const Validate = require('../lib/Validate');
const ErrorResponse = require('../lib/ErrorResponse');
const Stringer = require('../lib/Stringer');

module.exports = class ContactController {

	static async create(req, res, next) {

		let conn = DB.getMySQL();
		let query = SQLLoader.load('contact/contact-create');

		let person = {
			id: Stringer.numberfy(req.params.person_id)
		};

		if (!Validate.isInteger(person.id))
			return next();

		let contact = {
			type_id: req.body.type,
			info: req.body.info
		};

		let errResponse = new ErrorResponse();

		if (!Validate.contactType(contact.type_id))
			errResponse.add('ERR_INVALID_FIELD_TYPE');

		if (!Validate.contactInfo(contact.type_id, contact.info))
			errResponse.add('ERR_INVALID_FIELD_INFO');

		if (errResponse.hasErrors())
			return next(errResponse);

		try {
			await conn.query(query, {
				...contact,
				person_id: person.id
			});
		} catch (err) {
			return next(ErrorResponse.fromMySQL(err));
		}

		return res.json({ status: 'ok' });
	}

	static async update(req, res, next) {

		let conn = DB.getMySQL();
		let query = SQLLoader.load('contact/contact-update');

		let person = {
			id: Stringer.numberfy(req.params.person_id)
		};

		let contact = {
			id: Stringer.numberfy(req.params.contact_id),
			type_id: Stringer.numberfy(req.body.type),
			info: req.body.info
		};

		if (!Validate.isInteger(contact.id) || !Validate.isInteger(person.id))
			return next();

		let errResponse = new ErrorResponse();

		if (!Validate.contactType(contact.type_id))
			errResponse.add('ERR_INVALID_FIELD_TYPE');

		if (!Validate.contactInfo(contact.type_id, contact.info))
			errResponse.add('ERR_INVALID_FIELD_INFO');

		if (errResponse.hasErrors())
			return next(errResponse);

		try {
			await conn.query(query, {
				...contact,
				person_id: person.id
			});
		} catch (err) {
			return next(err);
		}

		return res.json({ status: 'ok' });
	}

	static async destroy(req, res, next) {
		let conn = DB.getMySQL();

		let contact = {
			id: req.params.person_id
		};

		if (!Validate.isInteger(contact.id))
			return next();

		let query = SQLLoader.load('contact/contact-destroy');
		try {
			let results = await conn.query(query, contact);
			console.log(results);
		} catch (err) {
			return next(err);
		}

		return res.json({ status: 'ok' });
	}
};