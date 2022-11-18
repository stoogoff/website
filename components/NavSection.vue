<template>
	<nav class="fixed p-4 top-0 right-0 left-0 bg-white block z-30">
		<div class="max-w-2xl mx-auto flex">
			<span class="font-bold tracking-wider leading-relaxed">
				<nuxt-link to="/">Stoo Goff</nuxt-link>
			</span>
			<div class="pt-1 flex-grow text-right">
				<nuxt-link to="/">Home</nuxt-link> &middot;
				<nuxt-link to="/blog">Writing</nuxt-link> &middot;
				<nuxt-link to="/books">Books</nuxt-link> &middot;
				<nuxt-link to="/albums">Albums</nuxt-link> &middot;
				<nuxt-link to="/games">Games</nuxt-link>
			</div>
		</div>
	</nav>
</template>