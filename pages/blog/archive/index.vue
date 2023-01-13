<template>
	<div>
		<section>
			<h1>Archive</h1>
			<loading-spinner v-if="$fetchState.pending" />
			<div v-else class="md:grid md:grid-cols-2 md:gap-4">
				<div
					v-for="(year, idx) in years"
					:key="`year_${idx}`"
					class="px-2 py-4 bg-gray-200 mb-4 md:mb-0 border-b-2 border-gray-300"
				>
					<div class="flex mb-4">
						<icon-view icon="calendar" />
						<h3 class="font-semibold ml-2 text-xl -mt-0.5">{{ year.year }}</h3>
					</div>
					<ul>
						<li
							v-for="(row, jdx) in year.items"
							:key="`date_${jdx}`"
							class="mb-3"
						>
							<nuxt-link :to="`/blog/archive/${row.date}`" class="inline-block ml-1 link">
								{{ row.date | archive }} 
							</nuxt-link>
							<icon-text icon="bookmark">
								{{ row.count }} article{{ row.count === 1 ? '' : 's' }}
							</icon-text>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
import uniq from 'lodash/uniq'
import { title, meta, url } from '~/utils/meta'

export default {
	name: 'ArchiveIndexPage',

	async fetch() {
		try {
			const dates = await this.$axios.$get('/api/articles/archive')

			this.years = uniq(dates.map(({ date }) => date.substring(0, date.indexOf('-'))))
				.map(year => ({
					year,
					items: dates.filter(({ date }) => date.startsWith(year))
				}))
		}
		catch(ex) {
			console.error(ex)
		}
	},

	data() {
		return {
			years: [],
		}
	},

	head() {
		const metadata = {
			title: 'Archive',
			url: `/blog/archive`,
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
