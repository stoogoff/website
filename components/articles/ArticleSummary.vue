<template>
	<article>
		<h2><nuxt-link :to="article.path">{{ article.title }}</nuxt-link></h2>

		<aside>
			<p>Posted in {{ article.category }} on
				<time :datetime="article.publish_date">{{ article.publish_date | date }}</time>.
			</p>
		</aside>

		<picture v-if="article.image">
			<nuxt-link :to="article.path">
				<img :src="article.image.source" :alt="article.image.text" />
			</nuxt-link>
		</picture>
		<render-markdown :content="article.summary" />
	</article>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ArticleSummary', {
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
})
</script>