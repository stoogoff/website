<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Tagged: {{ tag }}</h1>
			<p>Everything — article, book, album and game — tagged with <strong>{{ tag }}</strong>.</p>

			<ul>
				<li v-for="(item, idx) in items" :key="`item_${idx}`" class="flex mb-2 ">
					<icon-view v-if="item.type" :icon="item.type" />
					<nuxt-link :to="item.path" class="link ml-2">{{ item.title }}</nuxt-link>
				</li>
			</ul>
		</section>	
	</div>
</template>
<script>
import sortBy from 'lodash/sortBy'
import { unslug } from '~/utils/string'
import {
	CONTENT_ALBUMS,
	CONTENT_ARTICLES,
	CONTENT_BOOKS,
	CONTENT_GAMES,
} from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'TagPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.tag = unslug(params.tag)

		try {
			const keyTypeMap = {
				[CONTENT_ALBUMS]: 'music',
				[CONTENT_ARTICLES]: 'document',
				[CONTENT_BOOKS]: 'book',
				[CONTENT_GAMES]: 'controller',
			}

			const items = await Promise.all(Object.keys(keyTypeMap).map(key => 
				this.$content(key)
					.only(['title', 'tags'])
					.fetch()
			))

			this.items = sortBy(items
				.flat()
				.filter(({ tags }) => (tags || []).includes(this.tag))
				.map(item => {
					const key = item.path.substring(0, item.path.lastIndexOf('/'))

					return {
						...item,
						type: keyTypeMap[key] || false
					}
				}), ({ title }) => title)
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			tag: null,
			items: [],
		}
	},

	head() {
		if(!this.tag) return {}

		const metadata = {
			title: this.tag,
			url: `/tags/${this.$route.params.tag}`,
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
