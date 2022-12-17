
const winston = require('winston')
require('winston-papertrail').Papertrail

var winstonPapertrail = new winston.transports.Papertrail({
	host: process.env.LOGGING_URL,
	port: process.env.LOGGING_PORT,
	hostname: process.env.LOGGING_HOSTNAME,
})

winstonPapertrail.on('error', function(err) {
	// silently handle connection issues
	console.log(err)	
});

export const logger = new winston.createLogger({
	transports: [winstonPapertrail]
})
