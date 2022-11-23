<template>
	<div class="prose" itemprop="text">
		<div v-html="summary" class="text-xl" />
		<div v-html="content" />
	</div>
</template>
<script>
import Vue from 'vue'
import { markdown } from '~/utils/string'

export default Vue.component('ProseBlock', {
	props: {
		doc: {
			type: Object,
			required: true,
		},
	},

	computed: {
		content() {
			if(!this.doc) return ''
			if(!this.doc.content) return ''

			return markdown(this.doc.content)
		},

		summary() {
			if(!this.doc) return ''

			return markdown(this.doc.summary)
		},
	},
})
</script>
