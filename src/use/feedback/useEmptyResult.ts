import useImageStore from '@/stores/useImageStore'
import { storeToRefs } from 'pinia'

export default () => {
	const emptyResult = ref<string>()
	const imgStore = useImageStore()
	const { activeThemeProperty } = storeToRefs(imgStore)

	watch(activeThemeProperty, val => {
		if (val && typeof val === 'string') emptyResult.value = val
	})

	return emptyResult
}
