<template>
	<div>
		<loading-spinner v-if="blog == null" />
		<section v-else>
			<h1>{{ blog.title }}</h1>
			<nuxt-content class="prose text-xl" :document="blog" />
			<article-summary
				v-for="(article, idx) in articles"
				:key="`article_${idx}`"
				:article="article"
			/>

			<more-button url="/blog/archive" />
		</section>
	</div>
</template>
<script>
import { SUMMARY_FIELDS, CONTENT_ARTICLES } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'BlogIndexPage',

	async fetch() {
		try {
			this.blog = await this.$content('blog/index').fetch()
			this.articles = await this
				.$content(CONTENT_ARTICLES)
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

	head() {
		if(!this.blog) return {}

		const metadata = {
			title: this.blog.title,
			url: '/blog',
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
