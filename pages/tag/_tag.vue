<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Tagged: {{ tag }}</h1>
			<p>Everything — article, book, album and game — tagged with <strong>{{ tag }}</strong>.</p>
			<icon-text icon="bookmark">
				{{ items.length }} Items
			</icon-text>
			<ul>
				<li v-for="(item, idx) in items" :key="`item_${idx}`" class="flex mb-2 ">
					<icon-view v-if="item.icon" :icon="item.icon" />
					<nuxt-link :to="item.path" class="link ml-2">{{ item.title }}</nuxt-link>
				</li>
			</ul>
		</section>	
	</div>
</template>
<script>
import { unslug } from '~/utils/string'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'TagPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.tag = unslug(params.tag)

		try {
			const items = await this.$axios.$get('/api/tags/' + params.tag)
			const keyTypeMap = {
				'Album': 'music',
				'Article': 'document',
				'Book': 'book',
				'Game': 'controller',
			}

			this.items = items.map(item => ({ ...item, icon: keyTypeMap[item.type] }))
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
