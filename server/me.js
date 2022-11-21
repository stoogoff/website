
const { url, description } = require('../utils/meta')

module.exports = function me(req, res) {
	const me = url({ url: '/me' })

	res.json({
		'@context': [
			'https://www.w3.org/ns/activitystreams',
			'https://w3id.org/security/v1'
		],
		'id': me,
		'type': 'Person',
		'preferredUsername': 'stoo',
		'name': 'Stoo Goff',
		'summary': description(),
		'inbox': url({ url: '/me/inbox' }), // things posted to me
		'outbox': url({ url: '/me/outbox' }), // things I've posted
		//'following': url({ url: '/feed' }),
		//'followers': url({ url: '/feed' }),
		//'liked': url({ url: '/feed' }),
		'publicKey': {
			'id': me + '#main-key',
			'owner': me,
			'publicKeyPem': '-----BEGIN PUBLIC KEY-----...-----END PUBLIC KEY-----'
		}
	})
}
