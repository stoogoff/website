
const { url, description } = require('../../utils/meta')
const { getFeedPosts } = require('../feed/feed')

async function getOutbox(req, res) {
	const articles = await getFeedPosts()
	const converted = articles.map(article => ({
		'@context': 'https://www.w3.org/ns/activitystreams',
		type: 'Article',
		name: article.title,
		summary: article.summary,
		content: article.content,
		attributedTo: url({ url: '/me' }),
		published: article.published.toISOString().substring(0, 19) + 'Z',
	}))

	const collection = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		summary: description(),
		type: "OrderedCollection",
		totalItems: converted.length,
		orderedItems: converted,
	}
/*
{
			title: post.title,
			id: postUrl,
			link: postUrl,
			description: markdown(post.summary),
			published: date,
			category: [ { name: post.category } ],
			content,
			author,
			image,
			date,
		}*/
	res.json(collection)
}

module.exports = {
	get: getOutbox,
}
