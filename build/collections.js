"use strict";

const { sortByProperty } = require("./utils");

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
				files[path].collection = collections = [collections];
			}

			collections.forEach(collection => {
				data[collection] = data[collection] || [];
				data[collection].push(files[path]);

				keys.push(collection);
			});
		});

		keys.forEach((key) => {
			data[key].sort(sortByProperty(sort, reverse));
		});

		next();
	}
};