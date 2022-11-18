<template>
	<div v-html="parsedContent" />
</template>
<script>
import Vue from 'vue'
import { markdown } from '~/utils/string'

export default Vue.component('RenderMarkdown', {
	props: {
		content: {
			type: String,
			required: true,
		},
		stripOuterTag: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		parsedContent() {
			const content = markdown(this.content)

			if(!this.stripOuterTag) return content

			return content.replace(/^<[^>]+>/, '').replace(/<\/[^>]+>$/, '')
		},
	},
})
</script>