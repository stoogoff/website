"use strict";

const path = require("path");
const s3 = require("s3");

const CONFIG = require("./aws.json");
const PARAMS = {
	localDir: path.join(__dirname, "../live"),
	deleteRemoved: true,
	s3Params: {
		Bucket: "www.stoogoff.com",
		Prefix: "",
		ACL: "public-read"
	},
	getS3Params: (localFile, stat, callback) => {
		console.log(localFile);

		let params = {};

		if(localFile.endsWith(".xml")) {
			params["ContentType"] = "application/xml; charset=UTF-8";
		}

		console.log(params);

		callback(null, params);
	}
};

let client = s3.createClient({
	s3Options: CONFIG
});

let sync = client.uploadDir(PARAMS);

sync.on("error", err => console.error("Sync error:", err.stack));
sync.on("progress", () => console.log("Sync progress:", sync.progressAmount, sync.progressTotal));
sync.on("end", () => console.log("Complete"));
