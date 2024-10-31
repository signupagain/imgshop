import { searchCardScrollRecord } from '@/provides/bgScreenshot'
import { RouterOptions } from 'vue-router'

export default {
	scrollBehavior(_, from) {
		if (from.name === '/photo/[id]')
			return { top: searchCardScrollRecord.value, behavior: 'instant' }
	},
} as Partial<RouterOptions>
