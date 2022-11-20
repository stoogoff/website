
const OG_TYPE = 'website'
const BASE_URL = 'https://www.stoogoff.com'
const BASE_TITLE = 'Stoo Goff'
const BASE_DESCRIPTION = 'This is the website of Stoo Goff, a programmer, writer and musician living in Glasgow.'
const BASE_IMAGE = `${BASE_URL}/img/kickstarter-banner.png`

export const title = meta => meta && meta.title ? `${meta.title} | ${BASE_TITLE}` : BASE_TITLE

export const url = meta => meta && meta.url ? `${BASE_URL}${meta.url}` : `${BASE_URL}/`

export const image = meta => meta && meta.image ? `${BASE_URL}${meta.image}` : BASE_IMAGE

export const description = meta => (meta && meta.description) || BASE_DESCRIPTION

export const meta = meta => {
	const newTitle = title(meta)
	const combinedUrl = url(meta)
	const newImage = image(meta)
	const newDescription = description(meta)

	return [
		{
			hid: 'description',
			name: 'description',
			content: newDescription,
		},
		{
			hid: 'og:type',
			property: 'og:type',
			content: (meta && meta.type) || OG_TYPE,
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: combinedUrl,
		},
		{
			hid: 'og:title',
			property: 'og:title',
			content: newTitle,
		},
		{
			hid: 'og:description',
			property: 'og:description',
			content: newDescription,
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: newImage,
		},
		{
			hid: 'twitter:url',
			name: 'twitter:url',
			content: combinedUrl,
		},
		{
			hid: 'twitter:title',
			name: 'twitter:title',
			content: newTitle,
		},
		{
			hid: 'twitter:description',
			name: 'twitter:description',
			content: newDescription,
		},
		{
			hid: 'twitter:image',
			name: 'twitter:image',
			content: newImage,
		},
	]
}