<template>
	<div>
		<loading-spinner v-if="blog == null" />
		<section v-else>
			<h1>{{ blog.title }}</h1>
			<nuxt-content class="prose text-xl" :document="blog" />
			<icon-text icon="bookmark">
				{{ articles.length }} Articles
			</icon-text>
			<article-summary
				v-for="(article, idx) in articles"
				:key="`article_${idx}`"
				:article="article"
			/>
		</section>
	</div>
</template>
<script>
import { SUMMARY_FIELDS, CONTENT_ARTICLES } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'CategoryPage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.blog = await this.$content('blog/category', params.category).fetch()
			
			const articles = await this
				.$content(CONTENT_ARTICLES)
				.only(SUMMARY_FIELDS)
				.sortBy('publish_date', 'desc')
				.fetch()

			this.articles = articles
				.filter(({ category }) => (category || '').toLowerCase() === params.category)
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

	head() {
		if(!this.blog) return {}

		const metadata = {
			title: this.blog.title,
			url: `/blog/category/${this.$route.params.category}`,
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
