<template>
	<div>
		<section>
			<h1>{{ title }}</h1>

			<div class="prose text-xl">
				<slot />
			</div>

			<loading-spinner v-if="products.length == 0" />
			<aside v-else class="md:grid md:grid-cols-3 md:gap-4">
				<product-view
					v-for="(product, idx) in products"
					:key="`product_${idx}`"
					:product="product"
				/>
			</aside>
		</section>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ProductList', {
	props: {
		title: {
			type: String,
			default: null,
		},
		products: {
			type: Array,
			default: [],
		}
	},
})
</script>
