
// Signature: keyId="https://my-example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="

const postInbox = (signature) => {
	const parsed = {}

	signature.split(',').map(part => {
		const [key, value] = part.split('=')

		parsed[key] = value.replace(/"/g, '')
	})

	parsed.signature =  Buffer.from(parsed.signature, 'base64').toString('ascii')

	return parsed

	// TODO get actor key
	//const actor = await 
}


module.exports = {
	post: postInbox,
}
