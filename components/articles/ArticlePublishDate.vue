<template>
	<icon-text icon="calendar">
		Posted in <strong class="font-semibold">{{ article.category }}</strong> on
		<nuxt-link :to="dateLink">
			<time :datetime="article.publish_date">{{ article.publish_date | date }}</time>
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
