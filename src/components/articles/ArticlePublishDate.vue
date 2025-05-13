<template>
	<icon-text icon="calendar" class="mb-8">
		Posted in <nuxt-link :to="`/blog/category/${article.category.toLowerCase()}`" class="font-semibold">{{ article.category }}</nuxt-link> on
		<nuxt-link :to="dateLink">
			<time :datetime="article.publish_date" itemprop="datePublished">{{ article.publish_date | date }}</time>
		</nuxt-link>
	</icon-text>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ArticlePublishDate', {
	props: {
		article: {
			type: Object,
			required: true,
		},
	},

	computed: {
		dateLink() {
			if(!this.article) return '/'

			return `/blog/archive/${this.article.publish_date.substring(0, 7)}`
		},
	},
})
</script>
