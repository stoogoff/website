
const { url } = require('../utils/meta')

module.exports = function webfinger(req, res) {
	const resource = req.query.resource
	const me = 'acct:stoo@stoogoff.com'

	if(!resource) {
		return res.status(400).send('Bad Request. Please provide a \'resource\' parameter.')
	}

	if(resource !== me) {
		return res.status(404).send(`Not Found. Cannot find '${resource}'.`)
	}

	const href = url({ url: '/me' })

	res.json({
		'subject': me,
		'links': [
			{
				'rel': 'self',
				'type': 'application/activity+json',
				'href': href,
			}
		]
	})
}
