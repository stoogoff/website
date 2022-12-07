
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const axios = require('axios')
const { badRequest, serverError, jsonErrorHandler } = require('../errors')
const { me } = require('./me')
const { webfinger } = require('./webfinger')
const { getOutbox } = require('./outbox')
const { postInbox } = require('./inbox')

const app = express()

app.use(bodyParser.json({
	type: [
		'application/json',
		'application/activity+json',
	]
}))


// verify signature for inbox
const verifySignature = async (req, res, next) => {
	if(!('signature' in req.headers)) {
		return next(badRequest('No signature found.'))
	}

	const parsed = {}

	req.headers.signature.split(',').map(part => {
		const delimiter = part.indexOf('=')
		const key = part.substring(0, delimiter)
		const value = part.substring(delimiter + 1)

		parsed[key] = value.replace(/"/g, '')
	})

	parsed.comparison = parsed.headers.split(' ').map(header => {
		if(header === '(request-target)') {
			return '(request-target): post /me/inbox'
		}
		else {
			return `${header}: ${req.headers[header]}`
		}
	}).join('\n')

	try {
		const profile = await axios(parsed.keyId, {
			headers: {
				'Accept': 'application/json'
			}
		})

		const publicKey = profile.data.publicKey.publicKeyPem

		if(crypto.verify('SHA256', parsed.comparison, publicKey, Buffer.from(parsed.signature, 'base64'))) {
			next()
		}
		else {
			next(badRequest('Unable to verify signature.'))
		}
	}
	catch(ex) {
		next(badRequest())
	}
}

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

app.post('/me/inbox', verifySignature, async (req, res, next) => {
	try {
		await postInbox(req.body)

		res.status(201).send()
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
