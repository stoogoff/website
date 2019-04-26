
"use strict";

const path = require("path");

module.exports = {
	id: (input) => {
		return (input || "").trim().toLowerCase().replace("&#x27;", "'").replace(/[\s\W]+/g, "-");
	},

	sortByProperty: (property, reverse = false) => {
		return (a, b) => {
			a = a[property];
			b = b[property];

			let sorted = a == b ? 0 : (a > b ? 1 : -1);

			return reverse ? sorted * -1 : sorted;
		}
	},

	ext: (filePath, extension) => {
		return path.extname(filePath) == extension;
	}
};
