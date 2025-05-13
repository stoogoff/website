<template>
	<picture class="inline-block md:w-1/2 md:float-left md:mr-4 mb-2 p-1 border-2 border-gray-200 hover:border-blue-500">
		<nuxt-link :to="url" v-if="url">
			<nuxt-img provider="cloudinary" placeholder itemprop="image" :src="image" loading="lazy" />
		</nuxt-link>
		<nuxt-img provider="cloudinary" placeholder v-else itemprop="image" :src="image" loading="lazy" />
	</picture>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ArticleImage', {
	props: {
		image: {
			type: String,
			required: true,
		},
		url: {
			type: String,
		},
	},
})
</script>
