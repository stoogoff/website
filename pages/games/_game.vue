<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<article v-else>
			<header>
				<h1>{{ game.title }}</h1>
			</header>
			<div>
				<publish-date :item="game" />
				<article-image v-if="game.image" :image="game.image" />
				<nuxt-content :document="game" />
				<aside v-if="game.urls">
					<p v-if="game.urls.Play">
						Click here to <a :href="game.urls.Play">play {{ game.title }}</a>.
					</p>
					<p v-if="game.urls.Source">
						Click here to <a :href="game.urls.Source">view the source code</a>.
					</p>
				</aside>
				<tag-list :tags="game.tags" />
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
