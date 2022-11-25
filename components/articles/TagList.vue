<template>
	<div class="mb-5">
		<ul class="flex items-center flex-wrap -m-2">
			<li
				v-for="(tag, idx) in tags"
				:key="`tag_${idx}`"
				class="inline-block mr-2"
			><nuxt-link :to="url(tag)" itemprop="keywords">{{ tag }}</nuxt-link></li>
		</ul>
	</div>
</template>
<script>
import Vue from 'vue'
import { slugify } from '~/utils/string'

export default Vue.component('TagList', {
	props: {
		tags: {
			type: Array,
			required: true,
		},
	},

	methods: {
		url(tag) {
			return '/tag/' + slugify(tag)
		},
	},
})
</script>
<style scoped>

a {
	@apply px-3 py-1 rounded-lg bg-gray-100 uppercase text-xs tracking-widest font-semibold hover:bg-gray-700 hover:text-white no-underline transition-colors duration-500 m-0;
}

</style>