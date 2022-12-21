
const { url } = require('../../utils/meta')

export const ME = url({ url: '/me' })
export const MAIN_KEY = ME + '#main-key'
const NAMESPACE = 'https://www.w3.org/ns/activitystreams'

// object types

export const actor = name => ({
	'@context': NAMESPACE,
	type: 'Person',
	name: name || 'Stoo Goff',
})

export const activity = (type, object, summary) => ({
	'@context': NAMESPACE,
	summary,
	type: type,
	actor: actor(),
	object,
})

export const collection = (items, summary) => ({
	'@context': NAMESPACE,
	summary,
	type: 'Collection',
	totalItems: items.length,
	items,
})

export const orderedCollection = (items, summary) => ({
	'@context': NAMESPACE,
	summary,
	type: 'OrderedCollection',
	totalItems: items.length,
	orderedItems: items,
})

export const article = (name, summary, content, published) => ({
	'@context': NAMESPACE,
	type: 'Article',
	name,
	summary,
	content,
	attributedTo: actor(),
	published,
})

export const note = (name, content) => ({
	'@context': NAMESPACE,
	type: 'Note',
	name,
	content,
	attributeTo: actor(),
})

export const link = (url, mediaType) => ({
	'@context': NAMESPACE,
	type: 'Link',
	href: url,
	mediaType,
})

export const audio = (name, url) => ({
	'@context': NAMESPACE,
	type: 'Audio',
	name,
	url,
})

export const image = (name, ...urls) => ({
	'@context': NAMESPACE,
	type: 'Image',
	name,
	url: urls.length === 1 ? urls[0] : urls,
})

// activity types

export const accept = object => ({
	'@context': NAMESPACE,
	type: 'Accept',	
	actor: ME,
	object,
})
