<template>
	<nav-bar :transparent="transparent">
		<template #title>
			<nuxt-link to="/">Stoo Goff</nuxt-link>
		</template>
		<template #buttons>
			<nav-button icon="ellipsis" @click="toggleNavbar()" />
		</template>
		<transition name="fade">
			<div
				v-if="navbarOpen"
				class="absolute top-14 left-4 right-4 md:hidden bg-white block rounded shadow-lg"
			>
				<menu-list :menu-items="menuItems" />
			</div>
		</transition>
		<div class="hidden md:flex flex-grow items-center bg-transparent shadow-none">
			<menu-list :menu-items="menuItems" />
		</div>
	</nav-bar>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MainNav', {
	props: {
		transparent: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			navbarOpen: false,
			suppressClose: false,
		}
	},

	mounted() {
		document.addEventListener('click', () => {
			Vue.nextTick(() => {
				if(!this.suppressClose) {
					this.navbarOpen = false
				}

				this.suppressClose = false
			})
		})
	},

	computed: {
		menuItems() {
			let menuItems = [
				{
					title: 'Home',
					href: '/',
				},
				{
					title: 'Writing',
					href: '/blog',
					menuItems: [
						{ title: 'Archive', href: '/blog/archive' },
						{ title: 'General', href: '/blog/category/general' },
						{ title: 'Gaming', href: '/blog/category/gaming' },
						{ title: 'Music', href: '/blog/category/music' },
						{ title: 'Writing', href: '/blog/category/writing' },
					],
				},
				{
					title: 'Books',
					href: '/books',
				},
				{
					title: 'Albums',
					href: '/albums',
				},
				{
					title: 'Games',
					href: '/games',
				},
			]

			return menuItems
		},

		background() {
			return this.transparent ? 'bg-transparent' : 'bg-gray-600'
		},
	},

	methods: {
		toggleNavbar() {
			this.navbarOpen = !this.navbarOpen

			if(this.navbarOpen !== false) {
				this.suppressClose = true
			}
		},
	},
})
</script>
<style>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>