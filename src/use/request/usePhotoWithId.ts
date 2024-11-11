import useImageStore from '@/stores/useImageStore'
import { storeToRefs } from 'pinia'

export default () => {
	const route = useRoute('/photo/[id]')
	const imgStore = useImageStore()
	const { activeThemeProperty } = storeToRefs(imgStore)

	return computed(() =>
		!('error' in activeThemeProperty.value) ?
			Array.from(activeThemeProperty.value.photos).find(
				({ id }) => id === route.params.id
			)
		:	undefined
	)
}
