
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


// ----------
// MIDDLEWARE

// check a the prefix is in the allowed range
const verifyPrefix = (req, res, next) => {
	const ALLOWED_PREFIXES = ['albums', 'articles', 'books', 'games']
	const prefix = req.params.prefix

	if(!ALLOWED_PREFIXES.includes(prefix)) {
		return res.status(404).end(`Not Found: type '${prefix}' not found.`)
	}

	next()
}

const verifyLimit = (req, res, next) => {
	if(req.query.limit && isNaN(req.query.limit)) {
		return res.status(400).end(`Bad Request: limit '${req.query.limit}' is not a number.`)
	}

	next()
}


// -------
// HELPERS

// convert CouchDB format and add a path
const convertResponseToArray = (response, prefix) => response.data.rows.map(row => ({
	...row.doc,
	path: `${prefix}s/` + row.doc._id.substring(row.doc._id.lastIndexOf(':') + 1)
}))


// ------
// ROUTES

// check it works
app.get('/hello', (req, res) => res.send('Hello'))

// article specific list route
app.get('/articles', verifyLimit, async (req, res) => {
	const params = {
		descending: true,
		include_docs: true,
	}

	if(req.query.limit) {
		params.limit = parseInt(req.query.limit)
	}

	const response = await $axios.get('/_design/articles/_view/by_date', {
		params
	})

	let items = convertResponseToArray(response, 'blog/article')

	res.json(items)
})

// generic list route for books, games, and albums
app.get('/:prefix', verifyPrefix, verifyLimit, async (req, res) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const response = await $axios.get('_all_docs', {
		params: {
			startkey: `"${prefix}:"`,
			endkey: `"${prefix}:\ufff0"`,
			include_docs: true
		},	
	})

	let items = convertResponseToArray(response, prefix)

	items = items.sort(sortByProperty('publish_date')).reverse()

	if(req.query.limit) {
		const limit = parseInt(req.query.limit)

		items = items.slice(0, limit)
	}

	res.json(items)
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
