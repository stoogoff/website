
const { description } = require('../../utils/meta')
const { getFeedPosts } = require('../feed/feed')
const { article, note, image, url, collection } = require('./types')

export const getOutbox = async () => {
	const articles = await getFeedPosts()

	return collection(articles.map(a => {
		const published = a.published.toISOString().substring(0, 19) + 'Z'
		const object = a.content ?
			article(a.title, a.summary, a.content, published) :
			note(a.title, a.summary, published)

		if(a.image) {
			object.image = image(a.title, url(a.image.url, a.image.type))
		}

		return object
	}), description())
}
