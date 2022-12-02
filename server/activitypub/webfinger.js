
const { url } = require('../../utils/meta')
const { notFound } = require('../errors')

const webfinger = resource => {
	const me = 'acct:stoo@stoogoff.com'

	if(resource !== me) {
		throw notFound(`Cannot find '${resource}'.`)
	}

	const href = url({ url: '/me' })

	return {
		'subject': me,
		'links': [
			{
				'rel': 'self',
				'type': 'application/activity+json',
				'href': href,
			}
		]
	}
}

module.exports = {
	webfinger,
}