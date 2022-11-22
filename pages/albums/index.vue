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
			this.products = await this.$api.$get('/api/albums')
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