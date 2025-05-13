
const fs = require('fs')
const { Feed } = require('feed')
const { meta, title, url, description } = require('../../utils/meta')
const { markdown } = require('../../utils/string')
const { getArticles } = require('../api/api')

const BASE_URL = url()
const author = {
	name: 'Stoo Goff',
	email: 'stoo.goff@gmail.com',
	link: BASE_URL,
}

const absoluteUrls = input => input
	.replace(/ src="\//g, ` src="${BASE_URL}`)
	.replace(/ href="\//g, ` href="${BASE_URL}`)

const getFeedPosts = async () => {
	const posts = await getArticles(20, true)

	return posts.map(post => {
		const postUrl = url({ url: post.path })
		let image = null

		if(post.image) {
			image = {
				url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto/${post.image}`,
				type: 'image/jpeg',
			}
		}

		const date = new Date(Date.parse(post.publish_date))

		return {
			title: post.title,
			id: postUrl,
			link: postUrl,
			description: absoluteUrls(markdown(post.summary)),
			published: date,
			category: [ { name: post.category, term: post.category } ],
			content: absoluteUrls(markdown(post.content)),
			author,
			image,
			date,
		}
	})
}

const createFeed  = async () => {
	const feed = new Feed({
		title: title(),
		link: BASE_URL,
		id: BASE_URL,
		description: description(),
		language: 'en',
		copyright: `2013–${ (new Date()).getFullYear() } Stoo Goff`,
		feedLinks: {
			atom: url({ url: '/feed.atom'}),
			rss: url({ url: '/feed.rss'}),
			json: url({ url: '/feed.json'}),
		},
		author,
	})

	const posts = await getFeedPosts(20)

	posts.forEach(feed.addItem)

	return feed
}

module.exports = {
	getFeedPosts,
	createFeed,
}
