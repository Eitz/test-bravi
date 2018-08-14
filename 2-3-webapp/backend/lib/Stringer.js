module.exports = class Stringer {

	static DMY(date) {
		if (date instanceof Date) {
			return [
				date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
				(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
				date.getFullYear()
			].join('/');
		} else if (typeof date == 'string' && date) {
			let split = date.split('-');
			return split[2] + '/' + ((split[1]) < 10 ? '0' + (parseInt(split[1])) : (split[1])) + '/' + split[0];
		} else {
			return null;
		}
	}

	static numberfy(str) {
		if (str && new String(str).match(new RegExp(/^\d*\.?\d+$/)) && !isNaN(Number(str)))
			return Number(str);
		else
			return str;
	}

	static normalizeEmail(data) {
		data = data.replace(/\s/, '');
		return data.toLowerCase();
	}

	static normalizeName(data) {
		if (!data) return null;

		let ignoredWords = ['dos', 'das'];
		data = data.toLowerCase();

		let words = data.match(/\S+/g);

		for (var i = 0; i < words.length; i++) {
			if (words[i].length < 3 && words[i].length > 1 || ignoredWords.indexOf(words[i]) != -1)
				words[i] = words[i];
			else
				words[i] = Stringer.capitalizeFirst(words[i]);
		}
		return words.join(' ');
	}

	static capitalizeFirst(data) {
		if (!data) return null;
		return (data[0].toUpperCase() + data.slice(1));
	}

	static normalizePhone(data) {
		if (!data) return null;

		data = data.replace(/\D/g, '');

		let regex = /^(\(?[0-9]{2}\)?)\s?([9]{1})?([0-9]{4})[- ]?([0-9]{4,5})$/;

		if (!regex.test(data)) return null;

		return data.replace(regex, '($1) $2$3-$4');
	}

	static slugfy(data) {
		data = Stringer.unnacent(data);
		data = data.replace(/[\s \t\n]/g, '-');
		data = data.replace(/\W/g, '-');
		data = data.replace(/\-+/g, '-');
		data = data.replace(/\-$/g, '');
		return data.toLowerCase();
	}

	static unnacent(data) {
		return data.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}
};