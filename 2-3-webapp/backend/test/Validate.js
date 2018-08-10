const expect = require('chai').expect;
const Validate = require('../lib/Validate');

describe('Validate', function () {

	describe('isEmail', function () {
		it('should deny invalid emails', function () {
			expect(Validate.isEmail('richard@teste')).to.equals(false);
		});
		it('should accept valid emails', function () {
			expect(Validate.isEmail('richard@teste.tk')).to.equals(true);
		});
	});

	describe('minLength', function () {
		it('should deny invalid minimum length', function () {
			expect(Validate.minLength('12345', 6)).to.equals(false);
		});
		it('should accept valid minimum length', function () {
			expect(Validate.minLength('123456', 6)).to.equals(true);
		});
	});

	describe('isPhone', function () {
		it('should accept formated phone', function () {
			expect(Validate.isPhone('(47) 9658-6800')).to.equals(true);
		});
		it('should accept different lengths', function () {
			expect(Validate.isPhone('(47) 99658-6800')).to.equals(true);
		});
		it('should accept unformated numbers', function () {
			expect(Validate.isPhone('47 996586800')).to.equals(true);
		});
	});
});
