<template>
	<div class="pt-24">
		<nuxt-content :document="document" />
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'
import { stripTags, markdown } from '~/utils/string'

export default {
	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.document = await this.$content(params.pathMatch).fetch()
		}
		catch(error) {
			this.document = await this.$content('404').fetch()
		}
	},

	data() {
		return {
			document: null
		}
	},

	head() {
		if(!this.document) return {}

		const metadata = {
			type: 'article',
			title: this.document.title,
			description: stripTags(markdown(this.document.summary)),
			url: `/${this.$route.params.page}/`,
		}

		return {
			title: title(metadata),
			meta: meta(metadata),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>
