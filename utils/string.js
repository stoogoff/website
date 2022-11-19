
import { marked } from 'marked'

export const stripTags = content => (content || '' ).replace(/<^>+>/g, '')

export const markdown = content => marked(content || '', { smartypants: true })

export const slugify = content =>
	(content || '')
		.trim()
		.normalize("NFD")
		.replace(/[^a-z0-9\-\s]/gi, '')
		.replace(/\s{1,}/g, "-")
		.toLowerCase()

export const unslug = content => (content || '').replace(/-/g, ' ')
