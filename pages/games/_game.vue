<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<tag-list :tags="game.tags" />
			<header>
				<h1>{{ game.title }}</h1>
			</header>
			<div>
				<publish-date :item="game" />
				<article-image v-if="game.image" :image="game.image" />
				<nuxt-content class="prose" :document="game" />
				<aside v-if="game.urls">
					<div v-if="game.urls.Play" class="flex mb-4">
						<icon-view icon="controller" />
						<p class="mb-0 ml-2">Click here to <a :href="game.urls.Play" class="link">play {{ game.title }}</a>.</p>
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
import { CONTENT_GAMES } from '~/utils/config'

export default {
	name: 'GamePage',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.game = await this.$content(CONTENT_GAMES, params.game).fetch()
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
}
</script>
