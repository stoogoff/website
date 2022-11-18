<template>
	<div>
		<loading-spinner v-if="blog == null" />
		<section v-else>
			<h1>{{ blog.title }}</h1>
			<nuxt-content :document="blog" />
			<ul>
				<li
					v-for="(date, idx) in dates"
					:key="`date_${idx}`"
				>
					<nuxt-link :to="`/blog/archive/${date}`">{{ date | archive }}</nuxt-link>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
import uniq from 'lodash/uniq'

export default {
	name: 'ArchiveIndexPage',

	async fetch() {
		try {
			this.blog = await this.$content('blog/archive').fetch()

			const dates = await this
				.$content('blog/articles')
				.only(['publish_date'])
				.sortBy('publish_date', 'desc')
				.fetch()

			this.dates = uniq(dates.map(article => article.publish_date.substring(0, 7)))
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
}
</script>
