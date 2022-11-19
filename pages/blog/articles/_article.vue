<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<tag-list :tags="article.tags" />
			<header>
				<div>
					<h1>{{ article.title }}</h1>
				</div>
			</header>

			<prose-block :doc="article" />

			<aside>
				<p>Posted in {{ article.category }} on
					<nuxt-link :to="dateLink">
						<time :datetime="article.publish_date">{{ article.publish_date | date }}</time>
					</nuxt-link>
				</p>
			</aside>
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

	computed: {
		summary() {
			if(!this.article) return ''

			return markdown(this.article.summary)
		},

		dateLink() {
			if(!this.article) return '/'

			return `/blog/archive/${this.article.publish_date.substring(0, 7)}`
		},
	},
}
</script>
