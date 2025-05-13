<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Writing</h1>
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
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'BlogIndexPage',

	async fetch() {
		try {
			this.articles = await this.$axios.$get('/api/articles?limit=10')
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			articles: [],
		}
	},

	head() {
		const metadata = {
			title: 'Blog posts',
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
