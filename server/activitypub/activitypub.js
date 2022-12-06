
const express = require('express')
const bodyParser = require('body-parser')
const { badRequest, serverError, jsonErrorHandler } = require('../errors')
const { me } = require('./me')
const { webfinger } = require('./webfinger')
const { getOutbox } = require('./outbox')
const { postInbox } = require('./inbox')

const app = express()

app.use(bodyParser.json())


// get my profile
app.get('/me', (req, res) => {
	const response = me()

	res.json(response)
})

// get all outbox items
app.get('/me/outbox', async (req, res, next) => {
	try {
		const response = await getOutbox()

		res.json(response)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

app.post('/me/inbox', (req, res, next) => {
	if(!('signature' in req.headers)) {
		return next(badRequest('Please provide a \'signature\' header.'))
	}

	try {
		const response = postInbox(req.headers.signature, req.body)

		res.status(201).json(response)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

app.get('/.well-known/webfinger', (req, res, next) => {
	const resource = req.query.resource

	if(!resource) {
		return next(badRequest('Please provide a \'resource\' parameter.'))
	}

	try {
		const response = webfinger(resource)

		res.json(response)
	}
	catch(ex) {
		next(ex)
	}
})

// error handler
app.use(jsonErrorHandler)

module.exports = app
