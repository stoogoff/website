<template>
	<product-list title="Games" :products="products">
		<p>Occasionally I build video games, mostly for <a href="http://ludumdare.com/compo/">Ludum Dare</a> as I like the challenge of having a restricted deadline. It forces you to focus on building the game to the exclusion of all else. There's no time to worry about how to do anything, you just <em>do</em>.</p>
	</product-list>
</template>
<script>
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'GameIndexPage',

	async fetch() {
		try {
			this.products = await this.$axios.$get('/api/games')
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
			title: 'Games',
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