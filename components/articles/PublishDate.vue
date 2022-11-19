<template>
	<icon-text icon="calendar">
		Published <time :datetime="item.publish_date">{{ item.publish_date | date }}</time>
	</icon-text>
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
