<template>
	<div
		class="block w-full md:text-700 hover:bg-gray-100 md:hover:bg-transparent hover:text-black text-gray-800 px-4 py-3 md:py-0 flex items-center text-sm uppercase cursor-pointer"
		:class="{ 'disabled': disabled }"
		@click="click"
	>
		<span v-if="icon" class="md:text-white text-gray-500" :class="{ 'disabled': disabled }"><icon-view :icon="icon" /></span>
		<span class="block ml-2"><slot /></span>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('NavItem', {
	props: {
		icon: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		click() {
			if(!this.disabled) {
				this.$emit('click')
			}
		},
	}
})
</script>
<style scoped>


.disabled {
	@apply text-gray-800 md:hover:text-gray-800 cursor-default;
}
</style>