<template>
	<section>
		<div class="md:grid md:grid-cols-4 md:gap-4 md:mx-4">
			<article
				v-for="(article, idx) in cards"
				:key="`card_${idx}`"
				:article="article"
				class="relative flex flex-col justify-end mb-6 p-4 bg-gray-200 border-b-2 border-gray-300 md:rounded"
			>
				<h2 class="text-lg font-semibold mb-1 mt-0 truncate uppercase"><nuxt-link :to="article.path">{{ article.title }}</nuxt-link></h2>
				<render-markdown class="flex-grow" :content="article.summary" />
				<article-more :path="article.path" />
			</article>
			<loading-spinner v-if="$fetchState.pending" />
			<div v-else-if="album !== null">
				<product-view :product="album" />
			</div>
		</div>

		<div class="px-4 md:max-w-2xl md:mx-auto md:grid md:grid-cols-2 md:gap-4">
			<div>
				<h3>More Articles</h3>
				<ul>
					<li
						v-for="(article, idx) in articles"
						:key="`article_${idx}`"
						class="mb-2 border-b border-gray-200 py-1 last:border-b-0"
					>
						<nuxt-link :to="article.path" class="link">{{ article.title }}</nuxt-link>
					</li>
				</ul>
			</div>
			<loading-spinner v-if="$fetchState.pending" />
			<div v-else-if="book !== null">
				<h3>Latest Book</h3>
				<product-view :product="book" />
			</div>
		</div>
	</section>
</template>

<script>
import { SUMMARY_FIELDS } from '~/utils/config'

export default {
	layout: 'home',
	name: 'IndexPage',

	async fetch() {
		const articles = await this.$axios.$get('/api/articles?limit=13')

		this.cards = articles.slice(0, 3)
		this.articles = articles.slice(3)

		this.book = (await this.$axios.$get('/api/books?limit=1'))[0]
		this.album = (await this.$axios.$get('/api/albums?limit=1'))[0]
	},

	data() {
		return {
			cards: [],
			articles: [],
			book: null,
			album: null,
		}
	},
}
</script>
<style scoped>
h3 {
	@apply text-xl mb-2 uppercase mt-6 text-center;
}
</style>