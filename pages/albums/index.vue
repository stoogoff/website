<template>
	<product-list title="Albums" :products="products">
		<p>I’ve released two albums as part of <a href="https://nasoalmo.org/">Nasoalmo</a>, which you can find on my <a href="http://stoogoff.bandcamp.com/">Bandcamp</a> page. I also have a few songs and demos available on <a href="https://soundcloud.com/stoogoff">SoundCloud</a>.</p>
	</product-list>
</template>
<script>
import { CONTENT_ALBUMS } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'AlbumIndexPage',

	async fetch() {
		try {
			this.products = await this.$axios.$get('/api/albums')
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
			title: 'Albums',
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