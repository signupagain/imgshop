import useImageStore from '@/stores/useImageStore'
import { ShallowRef } from 'vue'

export default (target: ShallowRef<HTMLDivElement | null>) => {
	const imgStore = useImageStore()
	const appendImgs = imgStore.throttleAppendImgs(2000)

	const option: IntersectionObserverInit = {
		threshold: 0.3,
	}

	const cb: IntersectionObserverCallback = entries => {
		entries.forEach(entries => {
			if (entries.isIntersecting) appendImgs()
		})
	}

	const observer = new IntersectionObserver(cb, option)

	onMounted(() => {
		const el = unref(target)

		if (el) observer.observe(el)
	})

	onUnmounted(() => observer.disconnect())
}
