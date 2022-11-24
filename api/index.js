
const express = require('express')
const axios = require('axios')
const { sortByProperty } = require('../utils/list')

const app = express()
const $axios = axios.create({
	baseURL: process.env.DB_URL,
	headers: {
		Authorization: 'Basic ' + Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASSWORD}`, 'ascii').toString('base64'),
	},
})


const ALLOWED_PREFIXES = ['albums', 'articles', 'books', 'games']
const ALLOWED_CATEGORIES = ['general', 'gaming', 'music', 'writing']

// ----------
// MIDDLEWARE

// general purpose parameter verification
const verify = (key, allowedValues) => {
	return (req, res, next) => {
		const param = req.params[key]

		if(!param || !allowedValues.includes(param)) {
			return res.status(404).end('Not Found')
		}

		next()
	}
}

// check a the prefix is in the allowed range
const verifyPrefix = verify('prefix', ALLOWED_PREFIXES)

// verify query string data matches expected and throw error otherwise
const verifyQueryString = (req, res, next) => {
	if(req.query.limit && isNaN(req.query.limit)) {
		return res.status(400).end('Bad Request')
	}

	next()
}


// -------
// HELPERS

// get the public id of the item, without the type: prefix
const id = input => input.substring(input.lastIndexOf(':') + 1)

// convert CouchDB format and add a path for _all_docs responses
const convertAllDocsToArray = (response, prefix) => response.data.rows.map(row => ({
	...row.doc,
	path: `/${prefix}s/` + id(row.doc._id)
}))

// convert CouchDB format and add a path for view responses
const convertViewToArray = response => response.data.rows.map(row => ({
	...row.value,
	path: '/blog/articles/' + id(row.value._id)
}))


// ------
// ROUTES

// check it works
app.get('/hello', (req, res) => res.send('Hello'))

// article specific list route
app.get('/articles', verifyQueryString, async (req, res) => {
	const params = {
		descending: true,
	}

	if(req.query.limit) {
		params.limit = parseInt(req.query.limit)
	}
console.log(req.query.content)
	if(req.query.content && req.query.content === 'true') {
		params.include_docs = true
	}

	try {
		const response = await $axios.get('/_design/articles/_view/by_date', { params })
		let items = convertViewToArray(response)

		if(params.include_docs) {
			items = convertAllDocsToArray(response, '/blog/article')
		}
		else {
			items = convertViewToArray(response)
		}

		res.json(items)
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

app.get('/articles/category/:category', verifyQueryString, verify('category', ALLOWED_CATEGORIES), async (req, res) => {
	const category =
		req.params.category.substring(0, 1).toUpperCase() +
		req.params.category.substring(1)
	const params = {
		startkey: JSON.stringify([category, "\ufff0"]),
		endkey: JSON.stringify([category]),
		descending: true,
	}

	if(req.query.limit) {
		params.limit = parseInt(req.query.limit)
	}

	try {
		const response = await $axios.get('/_design/articles/_view/by_category', { params })
		const items = convertViewToArray(response)

		res.json(items)
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

// count of articles by yyyy-month
app.get('/articles/archive', async (req, res) => {
	try {
		const response = await $axios.get('/_design/articles/_view/archive', {
			params: {
				descending: true,
			}
		})

		const items = response.data.rows.map(({ key }) => key).reduce((total, current) => {
			if(!total[current]) {
				total[current] = 0
			}

			++total[current]

			return total
		}, {})

		res.json(Object.keys(items).map(key => ({ date: key, count: items[key] })))
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

// get all articles for a given date
app.get('/articles/archive/:date', async (req, res) => {
	if(!/^\d{4}-\d{2}$/.test(req.params.date)) {
		return res.status(400).send('Bad Request')
	}

	const params = {
		descending: true,
		key: JSON.stringify(req.params.date),
		include_docs: true,
	}

	try {
		const response = await $axios.get('/_design/articles/_view/archive', { params })
		const items = convertAllDocsToArray(response, 'blog/article')

		res.json(items)		
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

// /_design/all/_view/tags?key="hidden%20places"
// get all articles for a given tag
app.get('/tags/:tag', async (req, res) => {
	const params = {
		key: JSON.stringify(req.params.tag.replace(/-/g, ' ')),
	}

	try {
		const response = await $axios.get('/_design/all/_view/tags', { params })
		const items = response.data.rows.map(row => (
			{
				...row.value,
				path:
					'/' +
					(row.value.type === 'Article' ? 'blog/article' : row.value.type.toLowerCase()) +
					's/' +
					id(row.id)
			}
		))

		res.json(items)		
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

// generic list route for books, games, and albums
app.get('/:prefix', verifyPrefix, verifyQueryString, async (req, res) => {
	try {
		const prefix = req.params.prefix.replace(/s$/, '')
		const response = await $axios.get('_all_docs', {
			params: {
				startkey: `"${prefix}:"`,
				endkey: `"${prefix}:\ufff0"`,
				include_docs: true
			},	
		})

		let items = convertAllDocsToArray(response, prefix)

		items = items.sort(sortByProperty('publish_date')).reverse()

		if(req.query.limit) {
			const limit = parseInt(req.query.limit)

			items = items.slice(0, limit)
		}

		res.json(items)
	}
	catch(ex) {
		res.status(500).send(ex.message)
	}
})

// generic fetch by id route
app.get('/:prefix/:id', verifyPrefix, async (req, res) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const id = req.params.id

	try {
		const response = await $axios.get(`/${prefix}:${id}`)

		res.json(response.data)
	}
	catch(ex) {
		res.status(404).end(`Not Found: type with id '${id}' not found.`)
	}
})

module.exports = app
