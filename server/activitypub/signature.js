
const axios = require('axios')
const crypto = require('crypto')
const { badRequest } = require('../errors')
const { url } = require('../../utils/meta')

const ALGORITHM = 'SHA256'
const REQUEST_TARGET = '(request-target)'
const href = url({ url: '/me' })

// verify signature middleware for inbox
export const verifySignature = async (req, res, next) => {
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
		if(header === REQUEST_TARGET) {
			return `${REQUEST_TARGET}: post /me/inbox`
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

		if(crypto.verify(ALGORITHM, parsed.comparison, publicKey, Buffer.from(parsed.signature, 'base64'))) {
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

export const createSignature = (url, headers) => {
	const parsedUrl = new URL(url)

	if(!('Host' in headers)) {
		headers['Host'] = parsedUrl.hostname
	}

	if(!('Date' in headers)) {
		headers['Date'] = (new Date()).toUTCString()
	}

	const headerKeys = Object.keys(headers)
	const signingString =
		`${REQUEST_TARGET}: post ${parsedUrl.pathname}\n\n` +
		headerKeys.map(header => `${header.toLowerCase()}:${headers[header]}`).join('\n\n')
	const headerString = REQUEST_TARGET + ' ' + headerKeys.map(header => header.toLowerCase()).join(' ')

	console.log('signingString=', signingString)
	console.log('headerString=', headerString)

	const signature = crypto.sign(ALGORITHM, signingString, KEY)

	return {
		headers,
		signature: `keyId="${href}#main-key",algorithm="rsa-sha256",headers="${headerString}",signature="${signature}"`,
	}
}
