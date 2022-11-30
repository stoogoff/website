
// Signature: keyId="https://my-example.com/actor#main-key",headers="(request-target) host date",signature="Y2FiYW...IxNGRiZDk4ZA=="

const postInbox = (req, res) => {
	if(!('signature' in req.headers)) {
		return res.status(400).end('Bad Request')
	}

	const signature = {}

	req.headers.signature.split(',').map(part => {
		const [key, value] = part.split('=')

		signature[key] = value.replace(/"/g, '')
	})

	signature.signature = Buffer.from(signature.signature, 'base64').toString('ascii')
}


module.exports = {
	post: postInbox,
}
