<template>
	<div class="content mb-8">
		<loading-spinner v-if="$fetchState.pending" />
		<nuxt-content :document="text" v-else />
	</div>
</template>
<script>
import Vue from 'vue'
export default Vue.component('MarkdownContent', {
	props: {
		content: {
			type: String,
			required: true,
		},
	},
	async fetch() {
		try {
			this.text = await this.$content(this.content).fetch()
		}
		catch(error) {
			this.text = await this.$content('404').fetch()
		}
	},
	data() {
		return {
			text: '',
		}
	},
})
</script>