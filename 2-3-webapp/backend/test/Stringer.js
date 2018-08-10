const expect = require('chai').expect;
const Stringer = require('../lib/Stringer');

describe('Stringer', function () {

	describe('normalizeName', function () {
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
			expect(Stringer.normalizePhone('$47$9$6!@#%awd24100.6800')).to.equals(undefined);
		});
	});
});
