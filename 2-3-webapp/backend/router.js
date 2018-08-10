const Express = require('express');
const MW = require('./middlewares');

const PersonController = require('./controllers/PersonController');
const ContactController = require('./controllers/ContactController');

module.exports = class Router {

	constructor(app) {
		this.app = app;
	}

	setupRoutes() {

		if (process.env.ENV !== 'production')
			this.app.use(MW.allowCrossdomain);

		this.app.use(MW.logRequest);

		let routes = Express.Router();

		routes.route('/api/v1/person')
			.get(PersonController.list)
			.post(PersonController.create);

		routes.route('/api/v1/person/:person_id')
			.get(PersonController.retrieve)
			.put(PersonController.update)
			.delete(PersonController.destroy);

		routes.route('/api/v1/person/:person_id/contact')
			.post(ContactController.create);

		routes.route('/api/v1/person/:person_id/contact/:contact_id')
			.put(ContactController.update)
			.delete(ContactController.destroy);

		this.app.use(routes);

		// Error Dispatch
		this.app.use(MW.errorDispatch);
		// Page not found for all other routes
		this.app.use(MW.pageNotFound);
	}
};