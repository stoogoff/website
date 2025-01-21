<template>
	<footer class="bg-gray-700 text-gray-300 py-4 border-gray-300 border-t-2 mt-20">
		<section class="max-w-2xl mx-auto md:flex md:space-x-4 px-4 md:px-0 mb-6">
			<div class="hidden md:block md:w-1/4 md:flex-none">
				<img src="https://www.gravatar.com/avatar/ce581df7e2ee80c2f75def7ccfba91d5?s=200" alt="Stoo Goff" class="border-gray-300 border-2 w-full" />
			</div>
			<div class="md:flex-1 text-sm">
				<p>Stoo Goff is a writer, musician and programmer hailing from Norwich and now living in Glasgow. When not buried beneath a mountain of programming code or torturing guitars he can be found creating strange new lands and conjuring dreams from nothing. He regularly promises himself that he will finish the next novel and album.</p>
				<p>He is heavily influenced by a number of writers and musicians, including: Tom Waits, Ursula Le Guin, Trent Reznor, Gene Wolfe, Frank Miller and a host of Finnish Folk Metal.</p>
			</div>
		</section>
		<ul class="mb-8 px-4 md:flex md:gap-x-2 max-w-2xl mx-auto">
			<li
				v-for="(link, idx) in links"
				:key="`link_${idx}`"
				class="flex text-sm mb-2 px-2"
			>
				<icon-view :icon="link.icon" />
				<a :href="link.href" class="mb-0 mt-1 ml-2 hover:text-gray-200">{{ link.text }}</a>
			</li>
		</ul>
		<p class="text-center text-xs mb-0 pb-4">&copy; Copyright 2013&ndash;{{ now }} Stoo Goff</p>
	</footer>
</template>
<script>
import Vue from 'vue'
import { url } from '~/utils/meta'

export default Vue.component('FooterSection', {
	data() {
		return {
			links: [
				{ icon: 'github', text: 'Github', href: 'https://github.com/stoogoff' },
				{ icon: 'soundcloud', text: 'SoundCloud', href: 'https://soundcloud.com/stoogoff' },
				{ icon: 'bandcamp', text: 'Bandcamp', href: 'https://stoogoff.bandcamp.com/' },
				{ icon: 'rss', text: 'RSS', href: url({ url: '/feed.rss' }) },
				{ icon: 'atom', text: 'Atom', href: url({ url: '/feed.atom' }) },
			],
		}
	},

	computed: {
		now() {
			return (new Date()).getFullYear()
		}
	},
})
</script>
