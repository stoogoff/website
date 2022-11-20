<template>
	<div class="prose" itemprop="text">
		<div v-html="summary" class="text-xl" />
		<nuxt-content :document="doc" />
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
		summary() {
			if(!this.doc) return ''

			return markdown(this.doc.summary)
		},
	},
})
</script>
