/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Styles
import '@/styles/main.scss'

// Types
import type { App } from 'vue'
import i18next from './i18next'

// Provides
import { bgScreenshot, BGSCREENSHOT_KEY } from '@/provides/bgScreenshot'

export function registerPlugins(app: App) {
	i18next(app)
		.use(vuetify)
		.use(router)
		.use(pinia)
		.provide(BGSCREENSHOT_KEY, bgScreenshot)
}
