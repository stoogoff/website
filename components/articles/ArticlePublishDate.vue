<template>
	<aside class="uppercase text-xs flex mb-8">
		<icon-view icon="calendar" />
		<p class="mb-0 mt-1 ml-2">
			Posted in <strong class="font-semibold">{{ article.category }}</strong> on
			<nuxt-link :to="dateLink">
				<time :datetime="article.publish_date">{{ article.publish_date | date }}</time>
			</nuxt-link>
		</p>
	</aside>
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
