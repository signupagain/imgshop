/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import display from './display'
import defaults from './defaultComponents'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: {
		defaultTheme: import.meta.env.VITE_DEFAULT_COLOR_MODE ?? 'dark',
	},
	icons: {
		defaultSet: 'fa',
		aliases,
		sets: { fa },
	},
	display,
	defaults,
})
