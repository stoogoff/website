
const { description } = require('../../utils/meta')
const { zulu } = require('../../utils/date')
const { getFeedPosts } = require('../feed/feed')
const { article, note, image, link, collection } = require('./types')
const { logger } = require('../logger')


const actions = {
	async create(body) {
		// TODO convert note / article AP to standard article
	}
}

export const postOutbox = async body => {
	logger.info('postOutbox', body)

	const action = body.type.toLowerCase()

	if(action in actions) {
		await actions[action](body)
	}
}

export const getOutbox = async () => {
	const articles = await getFeedPosts()

	return collection(articles.map(a => {
		const published = zulu(a.published)
		const object = a.content ?
			article(a.title, a.summary, a.content, published) :
			note(a.title, a.summary, published)

		if(a.image) {
			object.image = image(a.title, link(a.image.url, a.image.type))
		}

		return object
	}), description())
}
