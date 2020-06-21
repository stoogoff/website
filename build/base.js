"use strict";

const Metalsmith = require("metalsmith");
const drafts = require("metalsmith-drafts");
const permalinks = require("metalsmith-permalinks");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const sass = require("metalsmith-sass");
const mmMoment = require("metalsmith-moment");
const moment = require("moment");
const marked = require("marked");
const collections = require("./collections");
const archive = require("./archive");
const each = require("./each");
const tags = require("./tags");
const utils = require("./utils");


// get the file we're building
const args = process.argv.slice(2);

if(args.length === 0) {
	console.error("live or staging must be provided.");
	process.exit();
}

const LIVE = args[0] === "live";
const BASE_URL = LIVE ? "https://www.stoogoff.com/" : "http://localhost:8000/";
const OUTPUT = LIVE ? "../live" : "../staging";


// get the handlebars partials and register them
const fs = require("fs");
const path = require("path");

let partials = {};
const incPath = path.join(__dirname, "../tpl/inc");
const files = fs.readdirSync(incPath);

files.forEach(f => partials[f] = fs.readFileSync(path.join(incPath, f), "utf8"));


// create some handlebars helpers
let helpers = {
	"kv": function(context, options) {
		let buffer = [];

		Object.keys(context).forEach(key => {
			buffer.push(options.fn({key: key, value: context[key]}));
		});

		return buffer.join("\n");
	},
	"moment": (context, format) => {
		return context && context.format ? context.format(format) : context;
	},
	"first": (context, number, options) => {
		return context.slice(0, number).map(i => options.fn(i)).join("\n");
	},
	"is": (obj, type, options) => {
		let collection = obj ? obj.collection : null;

		if((Array.isArray(collection) && collection.indexOf(type) != -1) || collection == type) {
			return options.fn(obj);
		}
	},
	"tags": context => {
		return context.trim().replace(/<[^>]+>/g, "");
	},
	"lower": context => {
		return context.toLowerCase();
	},

	"reverse": (context, options) => {
		return Array.from(context).reverse().map(i => options.fn(i)).join("\n");
	},
	"last": (context, options) => {
		return options.fn(context[context.length - 1]);
	},
	"seconds": property => {
		property = property.split(":").map(m => parseInt(m, 10));

		return property[0] * 60 + property[1];
	},
	"makeId": context => {
		return utils.id(context);
	}
};

const MARKDOWN = {
	smartypants: true,
	gfm: true,
	xhtml: true
};


// setup Metalsmith and run
Metalsmith(__dirname)
	.clean(true)
	.metadata({
		siteTitle: "Stoo Goff",
		baseUrl: BASE_URL,
		defaultDescription: "This is the website of Stoo Goff, a programmer, writer and musician living in Glasgow.",
		socialMedia: "stoogoff",
		now: moment(),
		fbAdmin: 544024471
	})
	.source("../src")
	.destination(OUTPUT)

	.use(each((file, key, files) => {
		if(key.endsWith(".DS_Store") || key.endsWith("~")) {
			delete files[key];
		}
	}))
	.use(drafts())
	.use(collections({
		sort: "publish_date",
		reverse: true
	}))
	.use(tags())
	.use(mmMoment(["publish_date"]))
	.use(archive())
	.use(sass({
		outputDir: "media/css/"
	}))
	.use(markdown(MARKDOWN))
	.use(permalinks({
		relative: false
	}))
	.use(each(f => {
		if(f.path && !f.path.endsWith("/")) {
			f.path += "/";
		}
	}))
	.use(each((file, key, files) => {
		if(!file.layout) {
			delete files[key];
		}
	}, ".html"))
	.use(each(file => {
		if(file.collection && Array.isArray(file.collection)) {
			file.category = file.collection[file.collection.length - 1];
		}
	}, ".html"))
	.use(each(file => {
		if(file.summary) {
			file.summary = absolutePath(marked(file.summary, MARKDOWN).replace("<p>", "").replace("</p>", ""));
		}
	}))
	.use(each(file => {
		file.contents = Buffer.from(absolutePath(file.contents.toString()), "utf8");
	}, ".html"))
	.use(layouts({
		directory: "../tpl",
		engineOptions: {
			partials: partials,
			helpers: helpers
		}
	}))
	// log
	//.use(each((f, k) => console.log(k)))

	.build(err => console.log(err || "\n\t...Fin...\n"));


function absolutePath(contents) {
	return contents.replace(/href="\$/g, `href="${BASE_URL}`).replace(/src="\$/g, `src="${BASE_URL}`);
}
