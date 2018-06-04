"use strict";

module.exports = function collections(options) {
	let sort = options.sort || "sort";
	let reverse = options.reverse || false;

	return (files, metalsmith, next) => {
		let data = metalsmith.metadata();
		let keys = [];

		Object.keys(files).forEach(path => {
			if(!files[path].collection) {
				return;
			}

			let collections = files[path].collection;

			if(!Array.isArray(collections)) {
				collections = [collections];
			}

			collections.forEach(collection => {
				data[collection] = data[collection] || [];
				data[collection].push(files[path]);

				keys.push(collection);
			});
		});

		keys.forEach((key) => {
			data[key].sort((a, b) => {
				let sorted = a[sort] == b[sort] ? 0 : (a[sort] > b[sort] ? 1 : -1);

				return reverse ? sorted * -1 : sorted;
			});
		});

		next();
	}
};