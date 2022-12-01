
const error = (status, message) =>({
	status,
	message,
})

const badRequest = (message = '') => error(400, `Bad Request. ${message}`)

const notFound = (message = '') => error(404, `Not found. ${message}`)

const serverError = (message = '') => error(500, `Internal Server Error. ${message}`)

const jsonErrorHandler = (err, req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(err.status).send(err)
}

module.exports = {
	badRequest,
	notFound,
	serverError,
	jsonErrorHandler,
}