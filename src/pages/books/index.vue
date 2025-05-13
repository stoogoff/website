<template>
	<product-list title="Books" :products="products">
		<p>I’ve written a number of short stories and novellas which I’ve self-published. All are available from my <a href="http://author.to/stoo-goff">Amazon</a> page.</p>
	</product-list>
</template>
<script>
import { CONTENT_BOOKS } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'BookIndexPage',

	async fetch() {
		try {
			this.products = await this.$axios.$get('/api/books')
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			products: [],
		}
	},

	head() {
		const metadata = {
			title: 'Books',
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