"use strict";

const ext = require("./utils").ext;


module.exports = (callback, filter) => {
	return (files, metalsmith, next) => {
		// file, path, all files, metalsmith
		Object.keys(files).forEach(path => {
			if(!filter || ext(path, filter)) {
				callback(files[path], path, files, metalsmith);
			}
		});

		next();
	}
};
