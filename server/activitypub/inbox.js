
const { badRequest, notFound } = require('../errors')
const { db, createId } = require('../db')

const $axios = db(process.env.DB_INBOX)

const actions = {
	async delete(body) {
		const id = body.object && typeof body.object === 'string' ? body.object : body.object.id

		try {
			const url = '/' + createId(id)
			const response = await $axios.get(url)

			await $axios.delete(url, {
				params: {
					rev: response.data._rev
				}
			})
		}
		catch(ex) {
			throw notFound(`Document with id '${id} doesn't exist.`)
		}
	},

	async create(body) {
		if(!body.object.id) {
			throw badRequest('ActivityType \'object.id\' not specified.')
		}

		const activity = {
			_id: createId(body.object.id),
			...body,
		}

		delete activity.cc
		delete activity.object.cc

		await $axios.post('/', activity)
	}
}

export const postInbox = async body => {
	if(!body.type) {
		throw badRequest('ActivityType \'type\' not specified.')
	}

	if(!body.object) {
		throw badRequest('ActivityType \'object\' not specified.')
	}

	if(!body.actor) {
		throw badRequest('ActivityType \'actor\' not specified.')
	}

	const action = body.type.toLowerCase()

	if(action in actions) {
		await actions[action](body)
	}
}
