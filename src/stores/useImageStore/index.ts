import { defineStore } from 'pinia'
import values from './values'
import useRequestImgs from './useRequestImgs'
import useThrottleAppendImgs from './useThrottleAppendImgs'

export default defineStore('imageStore', () => {
	const { imgsLib, activeTheme } = values

	watch(activeTheme, val => useRequestImgs(val), {
		immediate: true,
	})

	watch(imgsLib, val => {
		if (val.size > 10) {
			const oldestSearchPair = [...val.entries()][1]

			val.delete(oldestSearchPair[0])
		}
	})

	return {
		...values,
		appendImgs: useThrottleAppendImgs,
	}
})
