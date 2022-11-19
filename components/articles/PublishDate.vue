<template>
	<aside class="uppercase text-xs flex mb-8">
		<icon-view icon="calendar" />
		<p class="mb-0 mt-1 ml-2">
			Published <time :datetime="item.publish_date">{{ item.publish_date | date }}</time>
		</p>
	</aside>
</template>
<script>
import Vue from 'vue'

export default Vue.component('PublishDate', {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
})
</script>
