
const express = require('express')
const { badRequest, notFound, serverError, jsonErrorHandler } = require('../errors')
const {
	getArticles,
	getArticlesByCategory,
	getArchive,
	getArchiveByDate,
	getItemsForTag,
	getAllDocsByType,
	getDocByTypeId,
} = require('./api')

const app = express()

const ALLOWED_PREFIXES = ['albums', 'articles', 'books', 'games']
const ALLOWED_CATEGORIES = ['general', 'gaming', 'music', 'writing']


// ----------
// MIDDLEWARE

// general purpose parameter verification
const verify = (key, allowedValues) => {
	return (req, res, next) => {
		const param = req.params[key]

		if(!param || !allowedValues.includes(param)) {
			return next(notFound())
		}

		next()
	}
}

// check a the prefix is in the allowed range
const verifyPrefix = verify('prefix', ALLOWED_PREFIXES)

// verify query string data matches expected and throw error otherwise
const verifyQueryString = (req, res, next) => {
	if(req.query.limit && isNaN(req.query.limit)) {
		return next(badRequest())
	}

	next()
}


// ------
// ROUTES

// check it works
app.get('/hello', (req, res) => res.send('Hello'))

// article specific list route
app.get('/articles', verifyQueryString, async (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : false
	const content = req.query.content && req.query.content === 'true'

	try {
		const items = await getArticles(limit, content)

		res.json(items)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// get a category by name
app.get('/articles/category/:category', verifyQueryString, verify('category', ALLOWED_CATEGORIES), async (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : false
	const category =
		req.params.category.substring(0, 1).toUpperCase() +
		req.params.category.substring(1)

	try {
		const items = await getArticlesByCategory(category, limit)

		res.json(items)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// count of articles by yyyy-month
app.get('/articles/archive', async (req, res, next) => {
	try {
		const items = await getArchive()

		res.json(items)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// get all articles for a given date
app.get('/articles/archive/:date', async (req, res, next) => {
	if(!/^\d{4}-\d{2}$/.test(req.params.date)) {
		return next(badRequest('Invalid date format.'))
	}

	try {
		const items = await getArchiveByDate(req.params.date)

		res.json(items)		
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// /_design/all/_view/tags?key="hidden%20places"
// get all articles for a given tag
app.get('/tags/:tag', async (req, res, next) => {
	try {
		const items = await getItemsForTag(req.params.tag)

		res.json(items)		
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// generic list route for books, games, and albums
app.get('/:prefix', verifyPrefix, verifyQueryString, async (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : false
	const prefix = req.params.prefix.replace(/s$/, '')

	try {
		const items = await getAllDocsByType(prefix, limit)

		res.json(items)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// generic fetch by id route
app.get('/:prefix/:id', verifyPrefix, async (req, res, next) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const id = req.params.id

	try {
		const item = await getDocByTypeId(prefix, id)

		res.json(item)
	}
	catch(ex) {
		next(notFound(`Type with id '${id}' not found.`))
	}
})

// error handler
app.use(jsonErrorHandler)

module.exports = {
	path: '/api', handler: app
}
