<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>{{ blog.title }}</h1>
			<nuxt-content class="text-xl" :document="blog" />
			<ul>
				<li
					v-for="(row, idx) in dates"
					:key="`date_${idx}`"
				>
					<nuxt-link :to="`/blog/archive/${row.date}`">
						{{ row.date | archive }} ({{ row.count }} article{{ row.count === 1 ? '' : 's' }})
					</nuxt-link>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
import uniq from 'lodash/uniq'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'ArchiveIndexPage',

	async fetch() {
		try {
			this.blog = await this.$content('blog/archive').fetch()
			this.dates = await this.$axios.$get('/api/articles/archive')
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			blog: null,
			dates: [],
		}
	},

	head() {
		const metadata = {
			title: 'Archive',
			url: `/blog/archive`,
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
