<template>
	<figure
		class="inline-block overflow-hidden border-2 border-gray-200 w-full relative p-0"
		@mouseover="active = true"
		@mouseout="active = false"
	>
		<nuxt-link :to="product.path">
			<cld-image :public-id="product.image" />
		</nuxt-link>
		<figcaption
			class="block bg-gray-900 p-2 text-gray-300 bg-opacity-80 uppercase absolute bottom-0 left-0 right-0 transform transition-transform text-center"
			:class="{
				'translate-y-full': !active,
				'translate-y-0': active,
			}"
		><nuxt-link :to="product.path">{{ product.title }}</nuxt-link></figcaption>
	</figure>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ProductView', {
	props: {
		product: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			active: false,
		}
	},
})
</script>
