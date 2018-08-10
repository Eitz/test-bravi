const Stringer = require('./Stringer');

module.exports = class Objectificator {

	static fromUnderscore(underscoreFlatObjects) {

		if (!underscoreFlatObjects)
			return;

		let single = false;
		if (!(underscoreFlatObjects instanceof Array)) {
			underscoreFlatObjects = [underscoreFlatObjects];
			single = true;
		}

		let response = [];
		for (let obj of underscoreFlatObjects) {
			let newObj = {};
			for (let key in obj) {
				let x = newObj;
				let levels = key.split('_');
				for (let i = 0; i < levels.length; i++) {
					if (i != levels.length - 1) {
						if (!x[levels[i]])
							x[levels[i]] = {};
						x = x[levels[i]];
					}
					else {
						x[levels[i]] = Stringer.numberfy(obj[key]);
					}
				}
			}
			response.push(newObj);
		}
		return single ? response[0] : response;
	}
};