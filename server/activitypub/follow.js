
const { db } = require('../db')
const { collection } = require('./types')

const $axios = db(process.env.DB_INBOX)

export const getFollowers = async () => {
	const response = await $axios.get('/_design/stream/_view/followers')

	return collection(response.data.rows.map(row => row.key), undefined, response.data.total_rows)
}
