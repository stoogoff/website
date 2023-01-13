<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<error-view v-else-if="category === null">Category not found</error-view>
		<section v-else>
			<h1>{{ category.title }}</h1>
			<icon-text icon="bookmark" class="mb-8">
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
import { title, meta, url } from '~/utils/meta'
import { markdown } from '~/utils/string'

const CATEGORIES = {
	gaming: {
		title: 'Gaming',
		content: 'The section devoted to gaming, both table top role-playing games and video games.',
	},
	general: {
		title: 'General',
	},
	music: {
		title: 'Music',
		content: 'The section devoted to music, mostly my own.',
	},
	writing: {
		title: 'Writing',
		content: 'The section devoted to writing, mostly my own.',
	},
}

export default {
	name: 'CategoryPage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.category = CATEGORIES[params.category]
			this.articles = await this.$axios.$get('/api/articles/category/' + params.category)
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			category: null,
			articles: [],
		}
	},

	computed: {
		content() {
			if(!this.category) return ''
			if(!this.category.content) return ''

			return markdown(this.category.content)
		},
	},

	head() {
		if(!this.category) return {}

		const metadata = {
			title: this.category.title,
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
