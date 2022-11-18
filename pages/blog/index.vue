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

			<div>
				<nuxt-link to="/blog/archive/">More &raquo;</nuxt-link>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	name: 'BlogIndexPage',

	async fetch() {
		try {
			this.blog = await this.$content('blog/index').fetch()
			this.articles = await this
				.$content('blog/articles')
				.only(['title', 'publish_date', 'image', 'summary'])
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
