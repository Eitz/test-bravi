const expect = require('chai').expect;
const Stringer = require('../lib/Stringer');

describe('Stringer', function () {

	describe('normalizeName', function () {
		it('should return if input not provided', function () {
			expect(Stringer.normalizeName('')).to.equals(null);
		});
		it('should capitalize', function () {
			expect(Stringer.normalizeName('richard eitz')).to.equals('Richard Eitz');
		});
		it('should lower caps', function () {
			expect(Stringer.normalizeName('RICHARD EITZ')).to.equals('Richard Eitz');
		});
		it('should capitalize single letters in the name', function () {
			expect(Stringer.normalizeName('richard w eitz')).to.equals('Richard W Eitz');
		});
		it('shouldn\'t capitalize two letter words', function () {
			expect(Stringer.normalizeName('richard da silva')).to.equals('Richard da Silva');
		});
		it('shouldn\'t capitalize three letter specific words', function () {
			expect(Stringer.normalizeName('richard dos santos')).to.equals('Richard dos Santos');
		});
	});

	describe('capitalizeFirst', function () {
		it('should capitalize word', function () {
			expect(Stringer.capitalizeFirst('should')).to.equals('Should');
		});
		it('should capitalize letter', function () {
			expect(Stringer.capitalizeFirst('a')).to.equals('A');
		});
		it('shouldn\'t try to capitalize "nothing"', function () {
			expect(Stringer.capitalizeFirst('')).to.equals(null);
		});
	});

	describe('normalizePhone', function () {
		it('should format the string', function () {
			expect(Stringer.normalizePhone('4796586800')).to.equals('(47) 9658-6800');
		});
		it('should work with different lengths', function () {
			expect(Stringer.normalizePhone('47965896800')).to.equals('(47) 96589-6800');
		});
		it('should remove special chars', function () {
			expect(Stringer.normalizePhone('$47$9$6!@#%awd241.6800')).to.equals('(47) 96241-6800');
		});
		it('should deny too large phone', function () {
			expect(Stringer.normalizePhone('$47$9$6!@#%awd24100.6800')).to.equals(null);
		});
		it('shouldn\'t try to normalize "nothing"', function () {
			expect(Stringer.normalizePhone('')).to.equals(null);
		});
	});

	describe('slugify', function () {
		it('should format the string', function () {
			expect(Stringer.slugfy('Boca Raton')).to.equals('boca-raton');
		});
		it('should work with different chars', function () {
			expect(Stringer.slugfy('Boca.Raton')).to.equals('boca-raton');
		});
	});

	describe('DMY', function () {
		it('should output correct date', function () {
			let date = new Date(2010, 8, 5);
			expect(Stringer.DMY(date)).to.equals('05/09/2010');
		});

		it('should output correct date - 2', function () {
			let date = new Date(2010, 11, 23);
			expect(Stringer.DMY(date)).to.equals('23/12/2010');
		});

		it('should output correct date with MySQL format', function () {
			let date = '2010-10-05';
			expect(Stringer.DMY(date)).to.equals('05/10/2010');
		});

		it('should output correct date with MySQL format - 2', function () {
			let date = '2010-01-10';
			expect(Stringer.DMY(date)).to.equals('10/01/2010');
		});

		it('should output nothing if wrong input is provided', function () {
			let date = undefined;
			expect(Stringer.DMY(date)).to.equals(null);
		});
	});

	describe('normalizeEmail', function () {
		it('should output correct e-mail', function () {
			let badEmail = 'Ratonicos@bigodi.com ';
			let goodEmail= 'ratonicos@bigodi.com';
			expect(Stringer.normalizeEmail(badEmail)).to.equals(goodEmail);
		});
	});
});
