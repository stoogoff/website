
const express = require('express')
const axios = require('axios')

const app = express()
const $axios = axios.create({
	baseURL: process.env.DB_URL,
	headers: {
		Authorization: 'Basic ' + Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASSWORD}`, 'ascii').toString('base64'),
	},
})

const verifyPrefix = (req, res, next) => {
	const ALLOWED_PREFIXES = ['albums', 'articles', 'books', 'games']
	const prefix = req.params.prefix

	if(!ALLOWED_PREFIXES.includes(prefix)) {
		return res.status(404).end('Request failed with status code 404')
	}

	next()
}

app.get('/hello', (req, res) => res.send('Hello'))

app.get('/:prefix', verifyPrefix, async (req, res) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const response = await $axios.get('_all_docs', {
		params: {
			startkey: `"${prefix}:"`,
			endkey: `"${prefix}:\ufff0"`,
			include_docs: true
		},
	})

	const albums = response.data.rows.map(row => ({
		...row.doc,
		path: row.doc._id.replace(`${prefix}:`, `${prefix}s/`)
	}))

	res.json(albums)
})

app.get('/:prefix/:id', verifyPrefix, async (req, res) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const id = req.params.id

	try {
		const response = await $axios.get(`/${prefix}:${id}`)

		res.json(response.data)
	}
	catch(ex) {
		res.status(404).end(ex.message)
	}
})

module.exports = app
