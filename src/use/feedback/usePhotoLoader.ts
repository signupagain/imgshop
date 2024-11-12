import useImageStore from '@/stores/useImageStore'
import { storeToRefs } from 'pinia'
import { VSkeletonLoader } from 'vuetify/components'

export const STOPLOADING = 'data-stop-loading'

export default (threshold: number = 0.4) => {
	const imgStore = useImageStore()
	const { imgsLib, activeTheme, activeThemeProperty } = storeToRefs(imgStore)

	const option: IntersectionObserverInit = { threshold }
	const cb: IntersectionObserverCallback = (entries, observer) => {
		const data = activeThemeProperty.value

		if ('photos' in data) {
			const photos = Array.from(data.photos)

			entries.forEach(({ isIntersecting, target }) => {
				if (isIntersecting) {
					photos.forEach(photo => {
						if (photo.id === target.getAttribute('data-id'))
							photo.isLoading = false
					})
					observer.unobserve(target)
				}
			})

			data.photos = new Set(photos)
			imgsLib.value.set(activeTheme.value, data)
		}
	}
	const observer = new IntersectionObserver(cb, option)

	onUnmounted(() => observer.disconnect())

	return (loaderRef: Ref<InstanceType<typeof VSkeletonLoader> | null>) => {
		onMounted(() => {
			const loader = unref(loaderRef)
			if (loader?.$el instanceof Element) observer.observe(loader.$el)
		})
	}
}
