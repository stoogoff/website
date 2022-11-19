<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<tag-list :tags="article.tags" />
			<header>
				<h1>{{ article.title }}</h1>
			</header>
			<article-publish-date :article="article" />

			<prose-block class="overflow-hidden" :doc="article" />
		</article>
	</div>
</template>
<script>
import { markdown } from '~/utils/string'
import { CONTENT_ARTICLES } from '~/utils/config'

export default {
	name: 'ArticlePage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.article = await this.$content(CONTENT_ARTICLES, params.article).fetch()
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			article: null
		}
	},
}
</script>
