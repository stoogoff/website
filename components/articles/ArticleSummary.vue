<template>
	<article class="overflow-hidden mb-6 pb-4 border-b border-gray-200">
		<h2><nuxt-link :to="article.path">{{ article.title }}</nuxt-link></h2>

		<article-publish-date :article="article" />
		<article-image v-if="article.image" :image="article.image" />	
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