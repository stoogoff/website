
const express = require('express')
const { getFeedPosts, createFeed } = require('./feed')

const app = express()

app.get('/feed.rss', async (req, res) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'text/xml')
		res.send(feed.rss2())
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

app.get('/feed.atom', async (req, res) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'application/atom+xml')
		res.send(feed.atom1())
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

app.get('/feed.json', async (req, res) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'application/json')
		res.send(feed.json1())
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

module.exports = {
	path: '/', handler: app
}
