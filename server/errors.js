
const { logger } = require('./logger')

const error = (status, message) => ({
	status,
	message,
})

export const badRequest = (message = '') => {
	if(message) {
		try {
			logger.info(message)
		}
		catch(ex) {
			console.info(message)
		}
	}

	return error(400, `Bad Request. ${message}`)
}

export const notFound = (message = '') => {
	if(message) {
		try {
			logger.info(message)
		}
		catch(ex) {
			console.info(message)
		}
	}

	return error(404, `Not found. ${message}`)
}

export const serverError = (message = '') => {
	if(message) {
		try {
			logger.error(message)
		}
		catch(ex) {
			console.error(message)
		}
	}

	return error(500, `Internal Server Error. ${message}`)
}

export const jsonErrorHandler = (err, req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(err.status).send(err)
}
