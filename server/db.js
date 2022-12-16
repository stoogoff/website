
const axios = require('axios')


// set up Axios
export const db = url => axios.create({
	baseURL: url,
	headers: {
		Authorization: 'Basic ' + Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASSWORD}`, 'ascii').toString('base64'),
	},
})

// strip protocol from potential Couch IDs and replace / with _
export const createId = input => input.replace(/http[s]?:\/\//, '').replace(/\//g, '_')
