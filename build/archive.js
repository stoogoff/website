"use strict";

const moment = require("moment");

module.exports = () => {
	return (files, metalsmith, next) => {
		let archive = {};

		Object.keys(files).forEach(f => {
			let file = files[f];
			let collection = file.collection;

			if(!Array.isArray(collection)) {
				collection = [collection];
			}

			if(collection.indexOf("Article") == -1) {
				return;
			}

			let date = moment(file.publish_date);
			let key = date.format("YYYY/MM");

			if(!archive[key]) {
				archive[key] = {
					title: date.format("MMMM YYYY"),
					date: date.unix(),
					layout: "blog/month.hbs",
					contents: "",
					archive: []
				};
			}

			archive[key].archive.push(file);
		});

		let page = {
			title: "Archive",
			layout: "blog/archive.hbs",
			contents: "",
			archive: []
		};

		Object.keys(archive).forEach(key => {
			let url = "blog/date/" + key + "/index.html";

			archive[key].archive.sort((a, b) => {
				a = a.publish_date.valueOf();
				b = b.publish_date.valueOf();

				return a == b ? 0 : (a < b ? 1: -1);
			});

			files[url] = archive[key];

			page.archive.push({
				path: "/" + url.replace("index.html", ""),
				title: archive[key].title,
				date: archive[key].date
			});
		});

		page.archive.sort(function(a, b) {
			a = a.date;
			b = b.date;

			return a == b ? 0 : (a < b ? 1 : -1);
		});

		files["blog/archive/index.html"] = page;

		next();
	};
};