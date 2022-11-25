<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<error-view v-else-if="game === null">Game not found</error-view>
		<article v-else itemscope itemtype="https://schema.org/VideoGame">
			<tag-list :tags="game.tags" />
			<header>
				<h1 itemprop="name">{{ game.title }}</h1>
			</header>
			<div>
				<publish-date :item="game" />
				<div class="overflow-hidden">
					<article-image v-if="game.image" :image="game.image" />
					<prose-block :doc="game" />
				</div>
				<aside v-if="game.urls">
					<div v-if="game.urls.Play" class="flex mb-4">
						<icon-view icon="controller" />
						<p class="mb-0 ml-2">Click here to <a :href="game.urls.Play" class="link" itemprop="gameLocation">play {{ game.title }}</a>.</p>
					</div>
					<div v-if="game.urls.Source" class="flex mb-8">
						<icon-view icon="github" />
						<p class="mb-0 ml-2">Click here to <a :href="game.urls.Source" class="link">view the source code</a>.</p>
					</div>
				</aside>
			</div>
		</article>
	</div>
</template>
<script>
import { markdown, stripTags } from '~/utils/string'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'GamePage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.game = await this.$axios.$get('/api/games/' + params.game)
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			game: null
		}
	},

	head() {
		if(!this.game) return {}

		const metadata = {
			title: this.game.title,
			url: this.game.path,
			description: stripTags(markdown(this.game.summary)),
			image: this.game.image.source,
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
