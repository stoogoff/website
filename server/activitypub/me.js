
const { url, description } = require('../../utils/meta')

const me = () => {
	const href = url({ url: '/me' })

	return {
		'@context': [
			'https://www.w3.org/ns/activitystreams',
			'https://w3id.org/security/v1'
		],
		id: href,
		type: 'Person',
		preferredUsername: 'stoo',
		name: 'Stoo Goff',
		summary: description(),
		inbox: href + '/inbox', // things posted to me
		outbox: href + '/outbox', // things I've posted
		//'following': href + '/following',
		//'followers': href + '/followers',
		//'liked': href + '/liked',
		publicKey: {
			id: href + '#main-key',
			owner: href,
			publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7S/YeJyU8yZMPMhASADW\n73ryo8CfCZOd+UkqKam0eCAWZ4VqxrhtJlsDnmr/AZTYS7leEj3iIfiELjy4Educ\nEaFflq2J40ahBH6O8mX9QQUxpnjq0Lb7+Anbr5kbXp5BNFZWB0CCs7vfgoSvVRDU\ns/cqEbu2S0lfAIK9C1s1fnAq3DONguISu5py/BzU/iZjNGQ3suLfK2aZxBtk1fAW\nc+tZJdGz3rNk71SijsPzpcyT4h8MafZU4AjA+WvGlphTQbDbMp8rg/LdQ7xsFnZO\nsJ/DJOJGsMoEleuek7e8Exg+T1z/FQjwtwgGYV/p5MCZ6e9ECZXVmpsMCKU74rjY\nqQIDAQAB\n-----END PUBLIC KEY-----'
		},
		icon: {
			type: 'Image',
			mediaType: 'image/jpeg',
			url: 'https://www.gravatar.com/avatar/ce581df7e2ee80c2f75def7ccfba91d5',
		},
	}
}

module.exports = {
	me,
}
