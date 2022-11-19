<template>
	<div>
		<loading-spinner v-if="article == null" />
		<section v-else>
			<h1>{{ article.title }}</h1>

			<nuxt-content class="prose text-xl" :document="article" />

			<aside class="md:grid md:grid-cols-3 md:gap-4">
				<picture
					v-for="(product, idx) in products"
					:key="`product_${idx}`"
					class="inline-block p-1 border-2 border-gray-200 hover:border-blue-400 w-full"
				>
					<nuxt-link :to="product.path">
						<img :src="product.image.source" :alt="product.image.text" class="w-full" />
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
