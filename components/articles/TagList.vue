<template>
	<aside>
		<ul>
			<li v-for="(tag, idx) in tags" :key="`tag_${idx}`">
				<nuxt-link :to="url(tag)">{{ tag }}</nuxt-link>
			</li>
		</ul>
	</aside>
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