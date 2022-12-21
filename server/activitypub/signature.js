
const axios = require('axios')
const crypto = require('crypto')
const { badRequest } = require('../errors')

const ALGORITHM = 'SHA256'
const ENCODING = 'base64'
const REQUEST_TARGET = '(request-target)'
const KEY = process.env.PRIVATE_KEY

export const verifySignature = async (signature, headers) => {
	const parsed = {}

	signature.split(',').map(part => {
		const delimiter = part.indexOf('=')
		const key = part.substring(0, delimiter)
		const value = part.substring(delimiter + 1)

		parsed[key] = value.replace(/"/g, '')
	})

	parsed.comparison = parsed.headers.split(' ').map(header => {
		if(header === REQUEST_TARGET) {
			return `${REQUEST_TARGET}: post /me/inbox`
		}
		else {
			return `${header}: ${headers[header]}`
		}
	}).join('\n')

	try {
		const profile = await axios(parsed.keyId, {
			headers: {
				'Accept': 'application/json'
			}
		})

		const publicKey = profile.data.publicKey.publicKeyPem

		return crypto.verify(ALGORITHM, parsed.comparison, publicKey, Buffer.from(parsed.signature, ENCODING))
	}
	catch(ex) {
		throw badRequest(ex.message)
	}

	return false
}

// verify signature middleware for inbox
export const verifySignatureMiddleware = async (req, res, next) => {
	if(!('signature' in req.headers)) {
		return next(badRequest('No signature found.'))
	}

	try {
		const result = await verifySignature(req.headers.signature, req.headers)

		if(result) {
			next()
		}
		else {
			next(badRequest('Unable to verify signature.'))
		}
	}
	catch(ex) {
		next(ex)
	}
}

// sign a request
export const createSignature = (keyId, path, headers) => {
	if(!('host' in headers)) {
		throw badRequest('Invalid headers. Must contain \'Host\'.')
	}

	if(!('date' in headers)) {
		throw badRequest('Invalid headers. Must contain \'Date\'.')
	}

	const headerKeys = Object.keys(headers)
	const signingString =
		`${REQUEST_TARGET}: post ${path}\n` +
		headerKeys.map(header => `${header.toLowerCase()}: ${headers[header]}`).join('\n')
	const headerString = REQUEST_TARGET + ' ' + headerKeys.map(header => header.toLowerCase()).join(' ')
	const signature = Buffer.from(crypto.sign(ALGORITHM, signingString, KEY)).toString(ENCODING)

	return `keyId="${keyId}",algorithm="rsa-sha256",headers="${headerString}",signature="${signature}"`
}

export const createDigest = body => 'SHA-256=' + crypto.createHash(ALGORITHM).update(body).digest('hex')
