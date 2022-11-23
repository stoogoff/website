<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_BOOKS } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'BookIndexPage',

	async fetch() {
		try {
			this.article = await this.$content(CONTENT_BOOKS, 'index').fetch()
			this.products = await this.$axios.$get('/api/books')
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
			url: '/books',
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