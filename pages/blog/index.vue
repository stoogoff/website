<template>
	<div>
		<loading-spinner v-if="blog == null" />
		<section v-else>
			<h1>{{ blog.title }}</h1>
			<nuxt-content :document="blog" />

			<article-summary
				v-for="(article, idx) in articles"
				:key="`article_${idx}`"
				:article="article"
			/>

			<div class="flex justify-end">
				<nuxt-link to="/blog/archive/" class="inline-block border-2 border-blue-800 px-4 py-2 rounded uppercase text-sm font-semibold text-blue-800 hover:border-white hover:bg-blue-800 hover:text-white transition-color duration-500">More &raquo;</nuxt-link>
			</div>
		</section>
	</div>
</template>
<script>
import { SUMMARY_FIELDS } from '~/utils/config'

export default {
	name: 'BlogIndexPage',

	async fetch() {
		try {
			this.blog = await this.$content('blog/index').fetch()
			this.articles = await this
				.$content('blog/articles')
				.only(SUMMARY_FIELDS)
				.sortBy('publish_date', 'desc')
				.limit(10)
				.fetch()
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			blog: null,
			articles: [],
		}
	},
}
</script>
