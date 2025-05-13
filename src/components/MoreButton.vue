<template>
	<div class="flex justify-end">
		<nuxt-link :to="url" class="inline-block border-2 border-blue-800 px-4 py-2 rounded uppercase text-sm font-semibold text-blue-800 hover:border-white hover:bg-blue-800 hover:text-white transition-color duration-500">More &raquo;</nuxt-link>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MoreButton', {
	props: {
		url: {
			type: String,
			required: true,
		},
	},
})
</script>
