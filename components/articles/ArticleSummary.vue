<template>
	<article class="overflow-hidden mb-6 pb-4 border-b border-gray-200">
		<article-image v-if="article.image" :image="article.image" :url="article.path" />	
		<h2 class="text-lg font-bold mb-1 mt-0 truncate"><nuxt-link :to="article.path">{{ article.title }}</nuxt-link></h2>
		<render-markdown :content="article.summary" />
		<article-more :path="article.path" />
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