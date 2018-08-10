export default function request(url, options) {
	return new Promise((resolve, reject) => {
		if (!url) reject(new Error('URL parameter required'));
		// if (!options) reject(new Error('Options parameter required'));

		fetch(url, options)
			.then(response => response.json())
			.then(response => {
				if (response.errors) reject(response.errors);
				else resolve(response);
			})
			.catch(reject);
	});
}