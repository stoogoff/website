<template>
	<button
		class="cursor-pointer px-3 py-1 bg-transparent block md:hidden outline-none focus:outline-none"
		type="button"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<span class="text-gray-400" :class="{ 'disabled': disabled }"><icon-view :icon="icon" /></span>
	</button>
</template>
<script>
import Vue from 'vue'

export default Vue.component('NavButton', {
	props: {
		icon: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		}
	},
})
</script>
<style scoped>
.disabled {
	@apply text-gray-800 cursor-default;
}
</style>