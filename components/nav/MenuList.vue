<template>
	<ul class="flex flex-col md:flex-row md:ml-auto relative py-4 md:py-0">
		<li
			:key="`menu_${g}`"
			v-for="(item, g) in menuItems"
			class="group"
		>
			<nuxt-link :to="item.href">
				<nav-item :icon="item.icon">{{ item.title }}</nav-item>
			</nuxt-link>

			<ul
				v-if="item.menuItems"
				class="bg-white md:absolute group-hover:block md:hidden md:rounded md:shadow-lg py-2 md:w-40"
			>
				<li
					v-for="(subitem, h) in item.menuItems"
					:key="`menu_${g}_subitem_${h}`"
					:class="{ 'md:border-t border-gray-300': subitem.separator }"
				>
					<nuxt-link class="block pl-12 p-1 md:px-3 min-w-full md:hover:text-gray-800 md:hover:bg-gray-200 uppercase text-xs" :to="subitem.href">{{ subitem.title }}</nuxt-link>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MenuList', {
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
	},
})
</script>