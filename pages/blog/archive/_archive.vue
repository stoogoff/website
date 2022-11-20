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
		</section>
	</div>
</template>
<script>
import { SUMMARY_FIELDS } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'ArchiveDatePage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.blog = await this.$content('blog/archive').fetch()
			
			const articles = await this
				.$content('blog/articles')
				.only(SUMMARY_FIELDS)
				.sortBy('publish_date', 'desc')
				.fetch()

			this.articles = articles
				.filter(article => article.publish_date.startsWith(params.archive))
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
		const metadata = {
			title: `Archive for ${this.$route.params.archive}`,
			url: `/blog/archive/${this.$route.params.archive}`,
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
