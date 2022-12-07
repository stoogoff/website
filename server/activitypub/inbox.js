
const { db } = require('../db')

// Signature: keyId="https://my-example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="

const $axios = db(process.env.DB_INBOX)

export const postInbox = async body => {
	const response = await $axios.post('/', body)

	return response.data
}
