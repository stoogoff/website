import fs from 'fs'
import path from 'path'
import { $content } from '@nuxt/content'
import { meta, title, url, description } from './meta'
import { CONTENT_ARTICLES } from './config'
import { markdown } from './string'

const BASE_URL = url()
const author = {
	name: 'Stoo Goff',
	email: 'stoo.goff@gmail.com',
	link: BASE_URL,
}

export const getFeedPosts = async (limit) => {
	const posts = await $content(CONTENT_ARTICLES)
		.sortBy('publish_date', 'desc')
		.limit(limit)
		.fetch()

	return posts.map(post => {
		const postUrl = url({ url: post.path })
		let image = null

		if(post.image) {
			const stats = fs.statSync(`./static/${post.image.source}`)

			image = {
				url: url({ url: post.image.source }),
				type: post.image.type,
				length: stats.size,
			}
		}

		let content = fs.readFileSync(
			path.join(__dirname, `../content/${post.path}${post.extension}`),
		'utf8')

		content = content.substring(content.indexOf('---\n') + 4)
		content = content.substring(content.indexOf('---\n') + 4)
		content = markdown(content)
		content = content.replace(/ src="\//g, ` src="${BASE_URL}`)
		content = content.replace(/ href="\//g, ` href="${BASE_URL}`)

		const date = new Date(Date.parse(post.publish_date))

		return {
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
		}
	})
}

export const createFeed  = async feed => {
	feed.options = {
		title: title(),
		link: BASE_URL,
		id: BASE_URL,
		description: description(),
		language: 'en',
		copyright: `2013–${ (new Date()).getFullYear() } Stoo Goff`,
		feedLinks: {
			atom: url({ url: '/feed.atom'}),
			rss: url({ url: '/feed.rss'}),
		},
		author,
	}

	const posts = await getFeedPosts(20)

	posts.forEach(feed.addItem)
}
