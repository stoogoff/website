<template>
	<product-list :article="article" :products="products" />
</template>
<script>
import { CONTENT_BOOKS } from '~/utils/config'

export default {
	name: 'BookIndexPage',

	async fetch() {
		try {
			this.article = await this.$content(CONTENT_BOOKS, 'index').fetch()
			
			const products = await this
				.$content(CONTENT_BOOKS)
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