<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Tagged: {{ tag }}</h1>
			<p>Everything&mdash;article, book, album and game&mdash;tagged with <strong>{{ tag }}</strong>.</p>

			<ul>
				<li v-for="(item, idx) in items" :key="`item_${idx}`">
					<nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
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

export default {
	name: 'TagPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.tag = unslug(params.tag)

		try {
			let keyTypeMap = {
				[CONTENT_ALBUMS]: 'Album',
				[CONTENT_ARTICLES]: 'Article',
				[CONTENT_BOOKS]: 'Book',
				[CONTENT_GAMES]: 'Game',
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
					let title = item.title
					const key = item.path.substring(0, item.path.lastIndexOf('/'))

					if(key in keyTypeMap) {
						title = `${keyTypeMap[key]}: ${title}`
					}

					return {
						...item,
						title
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
}
</script>
