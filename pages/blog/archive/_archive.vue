<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<error-view v-else-if="error">Date not found</error-view>
		<section v-else>
			<h1>Archive</h1>
			<div class="prose text-xl mb-8">
				<p>Everything I’ve written by month and year.</p>
			</div>

			<article-summary
				v-for="(article, idx) in articles"
				:key="`article_${idx}`"
				:article="article"
			/>
		</section>
	</div>
</template>
<script>
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'ArchiveDatePage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.articles = await this.$axios.$get('/api/articles/archive/' + params.archive)
		}
		catch(ex) {
			this.error = true
			console.error(ex)
		}
	},

	data() {
		return {
			error: false,
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
