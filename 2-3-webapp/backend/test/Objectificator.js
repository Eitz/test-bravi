const expect = require('chai').expect;
const Objectificator = require('../lib/Objectificator');

describe('Objectificator', function () {
	describe('fromUnderscore', function () {
		it('should return undefined when called with undefined', function () {
			let object = undefined;
			expect(Objectificator.fromUnderscore(object)).to.deep.equals(undefined);
		});
		it('should convert string-integers into ints', function () {
			let object = { id: '1', name: 'Bob' };
			let newObject = { id: 1, name: 'Bob' };
			expect(Objectificator.fromUnderscore(object)).to.deep.equals(newObject);
		});
		it('should not change simple objects', function () {
			let object = { id: 1, name: 'Bob' };
			expect(Objectificator.fromUnderscore(object)).to.deep.equals(object);
		});
		it('should work with single objects', function () {
			let object = { id: 2, user_id: 1, user_name: 'Bob' };
			let newObject = { id: 2, user: { id: 1, name: 'Bob' } };
			expect(Objectificator.fromUnderscore(object)).to.deep.equals(newObject);
		});
		it('should work with multiple objects', function () {
			let object = { id: 2, user_id: 1, user_name: 'Bob' };
			let newObject = { id: 2, user: { id: 1, name: 'Bob' } };
			let result = Objectificator.fromUnderscore([object, object]);
			expect(result[0]).to.deep.equals(newObject);
			expect(result[1]).to.deep.equals(newObject);
			expect(result[2]).to.equals(undefined);
		});
	});
});
