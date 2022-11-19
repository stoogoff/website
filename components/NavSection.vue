<template>
	<nav class="fixed py-4 px-2 top-0 right-0 left-0 bg-white block z-30 border-gray-300 border-b-2">
		<div class="max-w-2xl mx-auto flex">
			<span class="font-bold tracking-wider leading-relaxed">
				<nuxt-link to="/">Stoo Goff</nuxt-link>
			</span>
			<div class="flex-grow text-right">
				<nuxt-link to="/">Home</nuxt-link> &middot;
				<nuxt-link to="/blog">Writing</nuxt-link> &middot;
				<nuxt-link to="/books">Books</nuxt-link> &middot;
				<nuxt-link to="/albums">Albums</nuxt-link> &middot;
				<nuxt-link to="/games">Games</nuxt-link>
			</div>
		</div>
	</nav>
</template>
<style scoped>
a {
	@apply uppercase text-sm inline-block px-2 py-1 transition-colors duration-700;
}
a:hover {
	@apply text-gray-900 bg-gray-200 rounded-md;
}
</style>