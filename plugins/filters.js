import Vue from 'vue'
import { markdown } from '~/utils/string'

Vue.filter('date', value => {
	if(!value) return ''

	const date = new Date(Date.parse(value))

	return new Intl.DateTimeFormat('en-GB').format(date)
})

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

Vue.filter('archive', value => {
	const [year, month] = value.split('-')

	return `${MONTHS[parseInt(month) - 1]} ${year}`
})

Vue.filter('markdown', markdown)
