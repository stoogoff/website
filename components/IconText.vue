<template>
	<aside class="uppercase text-xs flex text-gray-600">
		<icon-view :icon="icon" />
		<p class="mb-0 mt-1 ml-2">
			<slot />
		</p>
	</aside>
</template>
<script>
import Vue from 'vue'

export default Vue.component('IconText', {
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
})
</script>