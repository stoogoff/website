<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_GAMES } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'GameIndexPage',

	async fetch() {
		try {
			this.article = await this.$content(CONTENT_GAMES, 'index').fetch()
			this.products = await this.$axios.$get('/api/games')
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			article: null,
			products: [],
		}
	},

	head() {
		if(!this.article) return {}

		const metadata = {
			title: this.article.title,
			url: '/games',
		}

		return {
			title: title(metadata),
			meta: meta(metadata),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>