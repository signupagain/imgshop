import useImageStore from '@/stores/useImageStore'
import { storeToRefs } from 'pinia'

export default () => {
	const imgStore = useImageStore()
	const { activeThemeProperty } = storeToRefs(imgStore)

	const emptyResult = computed(() =>
		typeof activeThemeProperty.value === 'string' ?
			activeThemeProperty.value
		:	''
	)

	const responseError = computed(() =>
		(
			typeof activeThemeProperty.value !== 'string' &&
			activeThemeProperty.value.nextPage === null
		) ?
			activeThemeProperty.value.error
		:	''
	)

	return { emptyResult, responseError }
}
