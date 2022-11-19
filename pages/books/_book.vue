<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<tag-list :tags="book.tags" />
			<header>
				<h1>{{ book.title }}</h1>
				<p v-if="book.series" class="italic">
					Part {{ book.part }} of the <strong>{{ book.series }}</strong> series.
				</p>
			</header>
			<div>
				<publish-date :item="book" />
				<div class="overflow-hidden">
					<article-image v-if="book.image" :image="book.image" />
					<prose-block :doc="book" />
				</div>
				<aside v-if="book.urls" class="border-t border-gray-200 mt-6 pt-4 px-2">
					<p class="text-xl">More information, including purchasing options, is available at the following sites:</p>
					<ul class="bullet">
						<li v-for="(value, key) in book.urls">
							<a :href="value" class="link">{{ key }}</a>
						</li>
					</ul>
				</aside>
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
