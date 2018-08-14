
/**
 * Validation class
 */
module.exports = class Validate {

	/**
	 * @param {string} email
	 * @return {boolean}
	 */
	static isEmail(email) {
		let regex = /\b[A-Z0-9\._\%\+\-]+@[A-Z0-9\.-]+\.[A-Z]{2,}\b/i;
		return regex.test(email);
	}
	/**
	 * @param {string} data - The string to be tested
	 * @param {number} length - Minimum length for the string
	 * @return {boolean}
	 */
	static minLength(data, length) {
		return data.length >= length;
	}
	/**
	 * @param {number} num
	 * @return {boolean}
	 */
	static isInteger(num) {
		let regex = /^\d+$/;
		return regex.test(num);
	}
	/**
	 * @param {number} testedInteger
	 * @param {number} min
	 * @param {number} max
	 * @return {boolean}
	 */
	static integerInRange(testedInteger, min, max) {
		return Validate.isInteger(testedInteger) && testedInteger >= min && testedInteger <= max;
	}
	/**
	 * @param {string} name - The string to be tested
	 * @return {boolean}
	 */
	static isName(name) {
		if (!name)
			return false;
		let regex = /^[a-zàáèéìíòóùúãõâêîôûü\'\´\s.]+$/i;
		return regex.test(name);
	}
	/**
	 * @param {string} phone - The string to be tested
	 * @return {boolean}
	 * Tip: Use Stringer to format phone field before validate
	 */
	static isPhone(phone) {
		let regex = /^(\(?[0-9]{2}\)?)\s?([9]{1})?([0-9]{4})[- ]?([0-9]{4,5})$/igm;
		return regex.test(phone);
	}
	/**
		* @param {string} slug The string to be tested
	 * @returns {boolean}
	 */
	static isSlug(slug) {
		let regex = /^[a-z\-]+$/i;
		return regex.test(slug);
	}

	static contactType(type) {
		return Validate.integerInRange(type, 1, 5);
	}

	static contactInfo(type, info) {
		switch (type) {
		case 1:
			return Validate.isEmail(info);
		case 2:
		case 3:
		case 4:
			return Validate.isPhone(info);
		case 5:
			return Validate.isSlug(info);
		default:
			return false;
		}
	}
};