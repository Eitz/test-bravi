const DB = require('../lib/DB');
const SQLLoader = require('../lib/SQLLoader');
const Objectificator = require('../lib/Objectificator');
const Validate = require('../lib/Validate');
const ErrorResponse = require('../lib/ErrorResponse');
const Stringer = require('../lib/Stringer');

module.exports = class PersonController {

	static async list(req, res, next) {

		let conn = DB.getMySQL();
		let query = SQLLoader.load('person/person-list');

		let person_list;
		try {
			let results = await conn.query(query);
			person_list = Objectificator.fromUnderscore(results);
		} catch (err) {
			return next(err);
		}

		person_list = person_list.map(person => {
			if (!person.contact.info)
				person.contact = null;
			return person;
		});

		return res.json({ person_list });
	}

	static async retrieve(req, res, next) {

		let conn = DB.getMySQL();

		let person = {
			id: req.params.person_id
		};

		if (!Validate.isInteger(person.id))
			return next();

		let queryPerson = SQLLoader.load('person/person-retrieve');
		try {
			let results = await conn.query(queryPerson, person);
			person = Objectificator.fromUnderscore(results[0]);
		} catch (err) {
			return next(err);
		}

		if (!person || !person.id)
			return next();

		let queryContacts = SQLLoader.load('contact/contact-by-person');
		try {
			let results = await conn.query(queryContacts, { person_id: person.id });
			person.contacts = Objectificator.fromUnderscore(results);
		} catch (err) {
			return next(err);
		}

		return res.json({ person });
	}

	static async create(req, res, next) {

		let conn = DB.getMySQL();
		let query = SQLLoader.load('person/person-create');

		let person = {
			name: Stringer.normalizeName(req.body.person.name),
			contacts: req.body.person.contacts
		};

		let errResponse = new ErrorResponse();

		if (!Validate.isName(person.name))
			errResponse.add('ERR_INVALID_FIELD_NAME');

		if (person.contacts && person.contacts.length) {
			let i = 0;
			for (let contact of person.contacts) {
				if (!Validate.contactType(Stringer.numberfy(contact.type)))
					errResponse.add('ERR_INVALID_FIELD_CONTACT_TYPE', { index: i });
				if (!Validate.contactInfo(Stringer.numberfy(contact.type), contact.info)){
					errResponse.add('ERR_INVALID_FIELD_CONTACT_INFO', { index: i });
				}
				i++;
			}
		}

		if (errResponse.hasErrors())
			return next(errResponse);

		// TODO: transaction

		let insertedPersonId;
		try {
			let result = await conn.query(query, person);
			insertedPersonId = result.insertId;
		} catch (err) {
			return next(err);
		}

		let contactQuery = SQLLoader.load('contact/contact-create');

		if (person.contacts && person.contacts.length) {
			for (let contact of person.contacts) {
				try {
					await conn.query(contactQuery, {
						...contact,
						person_id : insertedPersonId
					});
				} catch (err) {
					next (err);
				}
			}
		}

		return res.json({ status: 'ok' });
	}

	static async update(req, res, next) {

		let conn = DB.getMySQL();
		let query = SQLLoader.load('person/person-update');

		let person = {
			id: parseInt(req.params.person_id),
			name: Stringer.normalizeName(req.body.person.name),
			contacts: req.body.person.contacts || []
		};

		let errResponse = new ErrorResponse();

		if (!Validate.isInteger(person.id))
			return next();

		if (!Validate.isName(person.name))
			errResponse.add('ERR_INVALID_FIELD_NAME');

		if (person.contacts && person.contacts.length) {
			let i = 0;
			for (let contact of person.contacts) {
				if (!Validate.contactType(Stringer.numberfy(contact.type)))
					errResponse.add('ERR_INVALID_FIELD_CONTACT_TYPE', { index: i });
				if (!Validate.contactInfo(Stringer.numberfy(contact.type), contact.info)){
					errResponse.add('ERR_INVALID_FIELD_CONTACT_INFO', { index: i });
				}
				i++;
			}
		}

		if (errResponse.hasErrors())
			return next(errResponse);

		// TODO: transaction
		try {
			await conn.query(query, person);
		} catch (err) {
			return next(err);
		}

		let contactRemovalQuery = SQLLoader.load('contact/contact-remove');
		let contactCreateQuery = SQLLoader.load('contact/contact-create');
		let contactUpdateQuery = SQLLoader.load('contact/contact-update');
		
		let contactKeepIds = person.contacts.map(c => c.id).filter(id => !!id);
		try {
			if (contactKeepIds.length == 0)
				contactKeepIds = [0];
			await conn.query(contactRemovalQuery, {
				person_id : person.id,
				id_array : contactKeepIds
			});
		} catch (err) {
			return next (err);
		}

		if (person.contacts && person.contacts.length) {

			for (let contact of person.contacts) {
				try {
					let qry = contact.id ? contactUpdateQuery : contactCreateQuery;
					await conn.query(qry, {
						...contact,
						person_id : person.id
					});
				} catch (err) {
					next (err);
				}
			}
		}

		return res.json({ status: 'ok' });
	}

	static async destroy(req, res, next) {
		let conn = DB.getMySQL();

		let person = {
			id: req.params.person_id
		};

		if (!Validate.isInteger(person.id))
			return next();

		let query = SQLLoader.load('person/person-destroy');
		try {
			let results = await conn.query(query, person);
			if (results.affectedRows === 0)
				return next();
		} catch (err) {
			return next(err);
		}

		return res.json({ status: 'ok' });
	}
};