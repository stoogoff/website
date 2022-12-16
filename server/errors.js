
const { logger } = require('./logger')

const error = (status, message) => ({
	status,
	message,
})

export const badRequest = (message = '') => {
	logger.info(message)

	return error(400, `Bad Request. ${message}`)
}

export const notFound = (message = '') => {
	logger.info(message)

	return error(404, `Not found. ${message}`)
}

export const serverError = (message = '') => {
	logger.error(message)

	return error(500, `Internal Server Error. ${message}`)
}

export const jsonErrorHandler = (err, req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(err.status).send(err)
}
