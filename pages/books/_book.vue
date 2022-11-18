<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<header>
				<h1>{{ book.title }}</h1>
				<p v-if="book.series" class="italic">
					Part {{ book.part }} of the <strong>{{ book.series }}</strong> series.
				</p>
			</header>
			<div>
				<publish-date :item="book" />
				<article-image v-if="book.image" :image="book.image" />
				<div v-html="summary" class="text-xl" />
				<nuxt-content :document="book" />
				<aside v-if="book.urls">
					<p>More information, including purchasing options, is available at the following sites:</p>
					<ul>
						<li v-for="(value, key) in book.urls">
							<a :href="value">{{ key }}</a>
						</li>
					</ul>
				</aside>
				<tag-list :tags="book.tags" />
			</div>
		</article>
	</div>
</template>
<script>
import { markdown } from '~/utils/string'
import { CONTENT_BOOKS } from '~/utils/config'

export default {
	name: 'BookPage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.book = await this.$content(CONTENT_BOOKS, params.book).fetch()
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			book: null
		}
	},

	computed: {
		summary() {
			if(!this.book) return ''

			return markdown(this.book.summary)
		},
	},
}
</script>
