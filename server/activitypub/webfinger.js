
const { url } = require('../../utils/meta')
const { badRequest, notFound } = require('../errors')

module.exports = function webfinger(req, res, next) {
	const resource = req.query.resource
	const me = 'acct:stoo@stoogoff.com'

	if(!resource) {
		return next(badRequest('Please provide a \'resource\' parameter.'))
	}

	if(resource !== me) {
		return next(notFound(`Cannot find '${resource}'.`))
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
