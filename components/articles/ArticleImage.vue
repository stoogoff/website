<template>
	<picture>
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
