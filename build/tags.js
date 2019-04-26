
"use strict";

const { id, sortByProperty } = require("./utils");


module.exports = () => {
	return (files, metalsmith, next) => {
		//let data = metalsmith.metadata();
		let tags = {};

		Object.keys(files).forEach(path => {
			if(!files[path].tags) {
				return;
			}

			files[path].tags.forEach(tag => {
				if(!tags[tag]) {
					tags[tag] = [];
				}

				let file = files[path];

				tags[tag].push({
					title: (file.collection ? file.collection[0] + ": " : "") + file.title,
					publish_date: file.publish_date,
					path: path.replace(".md", "/"),
					sort: file.title
				});
			});
		});

		// add all of the tags as objects to files
		Object.keys(tags).forEach(tag => {
			files[`tag/${id(tag)}/index.html`] = {
				title: tag,
				layout: "blog/tag.hbs",
				links: tags[tag].sort(sortByProperty("sort")),
				contents: ""
			};
		});

		next();
	};
};