<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_ALBUMS } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'AlbumIndexPage',

	async fetch() {
		try {
			this.article = await this.$content(CONTENT_ALBUMS, 'index').fetch()
			
			const products = await this
				.$content(CONTENT_ALBUMS)
				.only(['image'])
				.sortBy('publish_date', 'desc')
				.fetch()

			this.products = products.filter(product => !!product.image)

			//this.products = await this.$axios.get('/album:monkeys-in-space')
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
			url: '/albums',
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