<template>
	<picture class="inline-block md:w-1/2 md:float-left md:mr-4 mb-2 p-1 border-2 border-gray-200">
		<img :src="image.source" :alt="image.text" />
	</picture>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ArticleImage', {
	props: {
		image: {
			type: Object,
			required: true,
		},
	},
})
</script>
