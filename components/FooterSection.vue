<template>
	<footer class="bg-gray-200 py-4 border-gray-300 border-t-2">
		<section class="max-w-2xl mx-auto flex space-x-4">
			<div class="w-1/4 flex-none">
				<img src="/img/stoo-goff.jpg" alt="Stoo Goff" class="border-white border-2" />
			</div>
			<div class="flex-1 text-sm">
				<p>Stoo Goff is a writer, musician and programmer hailing from Norwich and now living in Glasgow. When not buried beneath a mountain of programming code or torturing guitars he can be found creating strange new lands and conjuring dreams from nothing. He regularly promises himself that he will finish the next novel and album.</p>
				<p>He is heavily influenced by a number of writers and musicians, including: Tom Waits, Ursula Le Guin, Trent Reznor, Neil Gaiman, Amanda Palmer, Gene Wolfe, Frank Miller and a host of Finnish Folk Metal.</p>
			</div>
		</section>
		<p class="text-center text-xs mb-0">&copy; Copyright 2013&ndash;{{ now }} Stoo Goff</p>
	</footer>
</template>
<script>
import Vue from 'vue'

export default Vue.component('FooterSection', {
	data() {
		return {
			links: [
				// url, icon, text
				// GitHub, Soundcloud, Bandcamp, Twitter, RSS, mastodon equivalent
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
