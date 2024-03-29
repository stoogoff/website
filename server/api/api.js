
//const axios = require('axios')
const { db } = require('../db')
const { sortByProperty } = require('../../utils/list')

const $axios = db(process.env.DB_WEBSITE)


// -------
// HELPERS

// get the public id of the item, without the type: prefix
export const id = input => input.substring(input.lastIndexOf(':') + 1)

// convert CouchDB format and add a path for _all_docs responses
export const convertAllDocsToArray = (response, prefix) => response.data.rows.map(row => ({
	...row.doc,
	path: `/${prefix}s/` + id(row.doc._id)
}))

// convert CouchDB format and add a path for view responses
export const convertViewToArray = response => response.data.rows.map(row => ({
	...row.value,
	path: '/blog/articles/' + id(row.value._id)
}))


// return all articles ordered by date descending
export const getArticles = async (limit = false, content = false) => {
	const params = {
		descending: true,
	}

	if(limit) {
		params.limit = limit
	}

	if(content) {
		params.include_docs = true
	}

	const response = await $axios.get('/_design/articles/_view/by_date', { params })

	if(params.include_docs) {
		return convertAllDocsToArray(response, '/blog/article')
	}
	else {
		return convertViewToArray(response)
	}
}

export const getArticlesByCategory = async (category, limit = false) => {
	const params = {
		startkey: JSON.stringify([category, "\ufff0"]),
		endkey: JSON.stringify([category]),
		descending: true,
	}

	if(limit) {
		params.limit = limit
	}

	const response = await $axios.get('/_design/articles/_view/by_category', { params })

	return convertViewToArray(response)
}

export const getArchive = async () => {
	const response = await $axios.get('/_design/articles/_view/archive', {
		params: {
			descending: true,
		}
	})
	const items = response.data.rows.map(({ key }) => key.substring(0, 7)).reduce((total, current) => {
		if(!total[current]) {
			total[current] = 0
		}

		++total[current]

		return total
	}, {})

	return Object.keys(items).map(key => ({ date: key, count: items[key] }))
}

export const getArchiveByDate = async date => {
	const params = {
		descending: true,
		startkey: JSON.stringify(date + '\u0fff'),
		endkey: JSON.stringify(date),
		include_docs: true,
	}
	const response = await $axios.get('/_design/articles/_view/archive', { params })

	return convertAllDocsToArray(response, 'blog/article')
}

export const getItemsForTag = async tag => {
	const params = {
		key: JSON.stringify(tag.replace(/-/g, ' ')),
	}
	const response = await $axios.get('/_design/all/_view/tags', { params })

	return response.data.rows.map(row => ({
		...row.value,
		path:
			'/' +
			(row.value.type === 'Article' ? 'blog/article' : row.value.type.toLowerCase()) +
			's/' +
			id(row.id)
	}))
}

export const getAllDocsByType = async (prefix, limit = false) => {
	const params = {
		startkey: `"${prefix}:"`,
		endkey: `"${prefix}:\ufff0"`,
		include_docs: true
	}

	const response = await $axios.get('_all_docs', { params })
	let items = convertAllDocsToArray(response, prefix)

	items = items.sort(sortByProperty('publish_date')).reverse()

	if(limit) {
		items = items.slice(0, limit)
	}

	return items
}

export const getDocByTypeId = async (prefix, id) => {
	const response = await $axios.get(`/${prefix}:${id}`)

	return response.data
}
