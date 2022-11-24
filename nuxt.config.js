import { meta, title, url, description } from './utils/meta'
import { createFeed } from './utils/feed'

export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: title(),
		meta: [
			...meta(),
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: description() },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ hid: 'canonical', rel: 'canonical', href: url() },
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/styles.css'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/filters.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'@nuxt/content',
	],

	/*feed: [
		{
			path: '/feed.rss',
			async create(feed) {
				await createFeed(feed)
			},
			cacheTime: process.env.NODE_ENV === 'production' ? 1000 * 60 * 24 : 0,
			type: 'rss2', // Can be: rss2, atom1, json1
		},
		{
			path: '/feed.atom',
			async create(feed) {
				await createFeed(feed)
			},
			cacheTime: process.env.NODE_ENV === 'production' ? 1000 * 60 * 24 : 0,
			type: 'atom1',
		},
	],*/

	serverMiddleware: [
		'~/server/activitypub/activitypub.js',
		{ path: '/api', handler: '~/server/api.js' },
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: process.env.API_URL,
	},

	googleFonts: {
		families: {
			Montserrat: {
				wght: [400, 600, 700],
				ital: [400]
			},
		},
		prefetch: true,
		preconnect: true,
		useStylesheet: true,
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		cache: process.env.NODE_ENV !== 'production',
		extractCSS: process.env.NODE_ENV === 'production' ? { ignoreOrder: true } : false,
		optimizeCSS: process.env.NODE_ENV === 'production',
	}
}
