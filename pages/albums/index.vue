<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_ALBUMS } from '~/utils/config'

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
}
</script>