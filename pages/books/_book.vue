<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else itemscope itemtype="https://schema.org/Book">
			<tag-list :tags="book.tags" />
			<header>
				<h1 itemprop="name">{{ book.title }}</h1>
				<p v-if="book.series" class="uppercase text-sm">
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
							<a :href="value" class="link" itemprop="url">{{ key }}</a>
						</li>
					</ul>
				</aside>
			</div>
		</article>
	</div>
</template>
<script>
import { markdown, stripTags } from '~/utils/string'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'BookPage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.book = await this.$axios.$get('/api/books/' + params.book)
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

	head() {
		if(!this.book) return {}

		const metadata = {
			type: 'book',
			title: this.book.title,
			description: stripTags(markdown(this.book.summary)),
			url: this.book.path,
			image: this.book.image.source,
		}

		const additional = [
			{
				hid: 'book:release_date',
				name: 'book:release_date',
				content: this.book.publish_date.substring(0, 10),
			},
			{
				hid: 'book:author',
				name: 'book:author',
				content: 'Stoo Goff',
			},
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
