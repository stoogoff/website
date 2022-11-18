<template>
	<div>
		<loading-spinner v-if="article == null" />
		<section v-else>
			<h1>{{ article.title }}</h1>

			<nuxt-content :document="article" />

			<aside class="grid grid-cols-3 gap-4">
				<picture v-for="(product, idx) in products" :key="`product_${idx}`">
					<nuxt-link :to="product.path">
						<img :src="product.image.source" :alt="product.image.text" />
					</nuxt-link>
				</picture>
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
