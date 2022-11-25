<template>
	<div>
		<loading-spinner v-if="article == null" />
		<section v-else>
			<h1>{{ article.title }}</h1>

			<nuxt-content class="prose text-xl" :document="article" />

			<aside class="md:grid md:grid-cols-3 md:gap-4">
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
		article: {
			type: Object,
			default: null,
		},
		products: {
			type: Array,
			default: [],
		}
	},
})
</script>
