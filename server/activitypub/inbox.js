
const { db } = require('../db')

// Signature: keyId="https://my-example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="

const $axios = db(process.env.DB_INBOX)

// signature parsing should be middleware
export const postInbox = async (headers, body) => {
	/*const parsed = {}

	signature.split(',').map(part => {
		const [key, value] = part.split('=')

		parsed[key] = value.replace(/"/g, '')
	})

	parsed.signature =  Buffer.from(parsed.signature, 'base64').toString('ascii')

	body.signature = parsed*/

	console.log(body)

	return await $axios.post('/', {
		headers,
		body,
	})

	// TODO get actor key
	//const actor = await 
}
