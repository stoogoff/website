
const express = require('express')
const { serverError, jsonErrorHandler } = require('../errors')
const { getFeedPosts, createFeed } = require('./feed')

const app = express()

app.get('/feed.rss', async (req, res, next) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'text/xml')
		res.send(feed.rss2())
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

app.get('/feed.atom', async (req, res, next) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'application/atom+xml')
		res.send(feed.atom1())
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

app.get('/feed.json', async (req, res, next) => {
	try {
		const feed = await createFeed()

		res.set('Content-Type', 'application/json')
		res.send(feed.json1())
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// error handler
app.use(jsonErrorHandler)

module.exports = {
	path: '/', handler: app
}
