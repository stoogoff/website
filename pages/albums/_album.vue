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
				<aside class="border-t border-gray-200 mt-2 md:mt-6 pt-4 px-2">
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

				<aside v-if="album.urls" class="border-t border-gray-200 mt-6 pt-4 px-2">
					<p class="text-xl">More information, including purchasing options, is available at the following sites:</p>
					<ul class="bullet">
						<li v-for="(value, key) in album.urls">
							<a :href="value" class="link">{{ key }}</a>
						</li>
					</ul>
				</aside>
			</div>
		</article>
	</div>
</template>
<script>
import { CONTENT_ALBUMS } from '~/utils/config'
import { markdown, stripTags } from '~/utils/string'
import { title, meta, url } from '~/utils/meta'

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

	head() {
		if(!this.album) return {}

		const metadata = {
			type: 'music.album',
			title: this.album.title,
			description: stripTags(markdown(this.album.summary)),
			url: this.album.path,
			image: this.album.image.source,
		}

		const additional = [
			{
				hid: 'music:release_date',
				name: 'music:release_date',
				content: this.album.publish_date.substring(0, 10),
			}
		]

		return {
			title: title(metadata),
			meta: meta(metadata, additional),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>
