<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_GAMES } from '~/utils/config'

export default {
	name: 'GameIndexPage',

	async fetch() {
		try {
			this.article = await this.$content(CONTENT_GAMES, 'index').fetch()
			
			const products = await this
				.$content(CONTENT_GAMES)
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