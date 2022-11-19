<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<tag-list :tags="album.tags" />
			<header>
				<h1>{{ album.title }}</h1>
			</header>
			<div>
				<publish-date :item="album" />
				<div class="overflow-hidden">
					<article-image v-if="album.image" :image="album.image" />
					<prose-block :doc="album" />
				</div>
				<div class="grid grid-cols-2 gap-4 border-t border-gray-200 mt-6 pt-4 px-2">
					<aside v-if="album.urls">
						<p class="text-xl">More information, including purchasing options, is available at the following sites:</p>
						<ul class="bullet">
							<li v-for="(value, key) in album.urls">
								<a :href="value" class="link">{{ key }}</a>
							</li>
						</ul>
					</aside>
					<aside class="border-l border-gray-200 pl-4">
						<div class="flex mb-2">
							<icon-view icon="music" />
							<h3 class="ml-2 text-xl font-semibold">Track Listing</h3>
						</div>
						<ul class="bullet -ml-2 mb-0">
							<li
								v-for="(track, idx) in album.track_listing"
								:key="`track_${idx}`"
								class="mb-1"
							>{{ track }}</li>
						</ul>
					</aside>
				</div>
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
