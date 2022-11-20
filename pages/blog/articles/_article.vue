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
import { markdown, stripTags } from '~/utils/string'
import { CONTENT_ARTICLES } from '~/utils/config'
import { title, meta, url } from '~/utils/meta'

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

	head() {
		if(!this.article) return {}

		const metadata = {
			type: 'article',
			title: this.article.title,
			description: stripTags(markdown(this.article.summary)),
			url: this.article.path,
			image: this.article.image ? this.article.image.source : null,
		}

		const additional = [
			{
				hid: 'article:published_time',
				name: 'article:published_time',
				content: this.article.publish_date.substring(0, 10),
			},
			{
				hid: 'article:author',
				name: 'article:author',
				content: 'Stoo Goff',
			},
			{
				hid: 'article:section',
				name: 'article:section',
				content: this.article.category,
			},
			...this.article.tags.map((tag, idx) => ({
				hid: `article:tag_${idx}`,
				name: 'article:tag',
				content: tag,
			}))
		]

		return {
			title: title(metadata),
			meta: meta(metadata, additional),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>
