<template>
	<section>
		<h1>Writing</h1>
		<p>Occasionally updated <nuxt-link to="/blog">blog posts</nuxt-link>.</p>

		<article-summary
			v-for="(article, idx) in articles"
			:key="`article_${idx}`"
			:article="article"
		/>
	</section>
</template>

<script>
import { SUMMARY_FIELDS } from '~/utils/config'

export default {
	name: 'IndexPage',

	async fetch() {
		this.articles = await this.$axios.$get('/api/articles?limit=5')
	},

	data() {
		return {
			articles: []
		}
	},
}
</script>
