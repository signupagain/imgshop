import { searchCardScrollRecord } from '@/provides/bgScreenshot'
import { RouterOptions } from 'vue-router'

export default {
	scrollBehavior(_, from, savedPosition) {
		if (from.name === '/photo/[id]')
			return { top: searchCardScrollRecord.value, behavior: 'instant' }

		if (savedPosition) return savedPosition

		return { top: 0, behavior: 'instant' }
	},
} as Partial<RouterOptions>
