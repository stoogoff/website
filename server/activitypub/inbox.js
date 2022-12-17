
const { badRequest, notFound, serverError } = require('../errors')
const { db, createId } = require('../db')
const { logger } = require('../logger')

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
			throw notFound(`Document with id '${id}' doesn't exist.`)
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
	},

	async follow(body) {
		const activity = {
			_id: createId(body.actor),
			...body,
		}

		await $axios.post('/', activity)

		try {
			// get the actor's inbox and post an Accept
			const response = await $axios.get(body.actor)

			if(response.data.inbox) {
				//const accept = 
			}
		}
		catch(ex) {
			throw serverError(ex.message)
		}

	},
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
	else {
		logger.info(`Action type ${action} not available.`)
	}
}
