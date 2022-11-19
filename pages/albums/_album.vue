<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<header>
				<h1>{{ album.title }}</h1>
			</header>
			<div>
				<publish-date :item="album" />
				<article-image v-if="album.image" :image="album.image" />
				<prose-block :doc="album" />
				<h3>Track Listing</h3>
				<ul>
					<li
						v-for="(track, idx) in album.track_listing"
						:key="`track_${idx}`"
					>{{ track }}</li>
				</ul>

				<aside v-if="album.urls">
					<p>More information, including purchasing options, is available at the following sites:</p>
					<ul>
						<li v-for="(value, key) in album.urls">
							<a :href="value">{{ key }}</a>
						</li>
					</ul>
				</aside>
				<tag-list :tags="album.tags" />
			</div>
		</article>
	</div>
</template>
<script>
import { CONTENT_ALBUMS } from '~/utils/config'

export default {
	name: 'AlbumPage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.album = await this.$content(CONTENT_ALBUMS, params.album).fetch()
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			album: null
		}
	},
}
</script>
