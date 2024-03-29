<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<error-view v-else-if="article === null">Article not found</error-view>
		<article v-else itemscope itemtype="https://schema.org/Article">
			<header
				class="pt-20 mb-10"
				:class="{ image }"
				:style="{ backgroundImage: `url(${image})` }"
			>
				<div class="main">
					<tag-list :tags="article.tags" v-if="image === null" />
					<h1 class="my-8 text-6xl leading-normal text-left pl-8 border-l-8 border-gray-500" itemprop="name">{{ article.title }}</h1>
				</div>
			</header>
			<div class="main">
				<tag-list :tags="article.tags" v-if="image !== null" />
				<article-publish-date :article="article" />
				<prose-block class="overflow-hidden" :doc="article" />
			</div>
		</article>
	</div>
</template>
<script>
import { markdown, stripTags } from '~/utils/string'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'ArticlePage',
	layout: 'article',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.article = await this.$axios.$get('/api/articles/' + params.article)

			if(this.article.image) {
				this.image = `https://res.cloudinary.com/dnileluie/image/upload/v1670456364/${this.article.image}`
			}
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			article: null,
			image: null,
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
			...(this.article.tags || []).map((tag, idx) => ({
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
<style scoped>
.image {
	@apply bg-cover bg-center h-96 relative z-0;
}
.image h1 {
	@apply text-white relative z-20 border-white;
}
.image:after {
	content: " ";
	@apply block bg-black h-96 absolute z-10 inset-0 bg-opacity-30;
}
</style>
