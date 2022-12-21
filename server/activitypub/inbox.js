
const { badRequest, notFound, serverError } = require('../errors')
const { db, createId } = require('../db')
const { logger } = require('../logger')
const { MAIN_KEY, accept } = require('./types')
const { createDigest, createSignature } = require('./signature')

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
			created: (new Date()).toISOString(),
			...body,
		}

		delete activity.cc
		delete activity.object.cc

		await $axios.post('/', activity)
	},

	async follow(body) {
		const activity = {
			_id: createId(body.actor),
			created: (new Date()).toISOString(),
			...body,
		}

		try {
			const followResponse = await $axios.get('/' + activity._id)

			if(followResponse.data._id) {
				logger.info(`Activity with ID '${activity._id}' already exists.`)

				return
			}
		}
		catch(ex) {
			// noop, we want the activity to not exist
		}

		try {
			await $axios.post('/', activity)

			// get the actor's inbox and post an Accept
			const response = await $axios.get(body.actor)

			if(response.data.inbox) {
				const inbox = new URL(response.data.inbox)
				const requestBody = accept(body.id)
				const headers = {
					host: 'www.stoogoff.com',
					date: (new Date()).toUTCString(),
					digest: createDigest(JSON.stringify(requestBody)),
					'content-type': 'application/activity+json',
				}

				headers.signature = createSignature(MAIN_KEY, inbox.pathname, headers)

				await $axios.post(response.data.inbox, requestBody, {
					headers,
				})
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
