<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Tagged: {{ tag }}</h1>
			<p>Everything — article, book, album and game — tagged with <strong>{{ tag }}</strong>.</p>
			<icon-text icon="bookmark" class="mb-8">
				{{ itemLength }} Item{{ itemLength === 1 ? '' : 's' }}
			</icon-text>
			<div class="grid" :class="{
				'grid-cols-2': groups.length === 2,
				'grid-cols-3': groups.length === 3,
				'grid-cols-4': groups.length === 4,
			}">
				<div v-for="(group, idx) in groups" :key="`group_${idx}`">
					<icon-text :icon="group.icon" class="mb-2">
						{{ group.type }}
					</icon-text>
					<ul>
						<li
							v-for="(item, jdx) in group.items"
							:key="`group_${idx}_item_${jdx}`"
							class="flex mb-2"
						>
							<nuxt-link :to="item.path" class="link ml-2">{{ item.title }}</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</section>	
	</div>
</template>
<script>
import uniq from 'lodash/uniq'
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

			this.itemLength = items.length
			this.groups = uniq(items.map(({ type }) => type))
				.map(type => ({
					type,
					icon: keyTypeMap[type],
					items: items.filter(item => item.type === type )
				}))

			console.log(this.groups)
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			tag: null,
			itemLength: 0,
			groups: [],
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
