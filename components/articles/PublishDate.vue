<template>
	<aside>
		<p>Published <time :datetime="item.publish_date">{{ item.publish_date | date }}</time></p>
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
