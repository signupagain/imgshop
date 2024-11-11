import useImageStore from '@/stores/useImageStore'
import { ShallowRef } from 'vue'

const imgStore = useImageStore()

export default (target: ShallowRef<HTMLDivElement | null>) => {
	const option: IntersectionObserverInit = {
		threshold: 0.01,
	}

	const cb: IntersectionObserverCallback = entries =>
		entries.forEach(({ isIntersecting }) => {
			if (isIntersecting) imgStore.appendImgs()
		})

	const observer = new IntersectionObserver(cb, option)

	onMounted(() => {
		if ('error' in imgStore.activeThemeProperty) {
			observer.disconnect()
			return
		}

		const el = unref(target)

		if (el) observer.observe(el)
	})

	onUnmounted(() => observer.disconnect())
}
