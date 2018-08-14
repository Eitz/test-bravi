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

	describe('isName', function () {
		it('should accept formated name', function () {
			expect(Validate.isName('Bob The Builder')).to.equals(true);
		});
		it('should accept different chars', function () {
			expect(Validate.isName('Sra. Capivára Quântica')).to.equals(true);
		});
		it('should not accept nothing', function () {
			expect(Validate.isName('')).to.equals(false);
		});
		it('should not accept bad names', function () {
			expect(Validate.isName('dasda 151 ad')).to.equals(false);
		});
	});

	describe('contactType', function () {
		it('should accept correct type', function () {
			expect(Validate.contactType(5)).to.equals(true);
		});
		it('should accept correct type (as string)', function () {
			expect(Validate.isPhone('3')).to.equals(false);
		});
		it('should deny incorrect type', function () {
			expect(Validate.isPhone(6)).to.equals(false);
		});
	});

	describe('contactInfo', function () {
		it('should validate 1 as e-mail', function () {
			expect(Validate.contactInfo(1, 'richard@rich.com')).to.equals(true);
		});
		it('should validate 1 as e-mail (incorrect)', function () {
			expect(Validate.contactInfo(1, 'richardrich.com')).to.equals(false);
		});
		for (let i = 2; i <= 4; i++) {
			it(`should validate ${i} as phone`, function () {
				expect(Validate.contactInfo(i, '45991235244')).to.equals(true);
			});
			it(`should validate ${i} as phone (incorrect)`, function () {
				expect(Validate.contactInfo(i, '9 91235244m')).to.equals(false);
			});
		}
		it('should validate 5 as slug', function () {
			expect(Validate.contactInfo(5, 'bob-marley')).to.equals(true);
		});
		it('should validate 5 as slug (incorrect)', function () {
			expect(Validate.contactInfo(5, 'basda 14251s')).to.equals(false);
		});
		it('should validate anything else as incorrect', function () {
			expect(Validate.contactInfo(6, 'basda 14251s')).to.equals(false);
		});
	});
});
