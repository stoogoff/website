<template>
	<div class="flex justify-end">
		<nuxt-link class="uppercase text-xs text-gray-600 hover:text-gray-200 inline-block hover:bg-gray-800 px-2 py-1 rounded transition-colors duration-500" :to="path">Read More &raquo;</nuxt-link>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ArticleMore', {
	props: {
		path: {
			type: String,
			required: true,
		},
	},
})
</script>