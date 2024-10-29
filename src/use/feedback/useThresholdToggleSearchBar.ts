import { ShallowRef } from 'vue'

export default (
	target: ShallowRef<Element | null>,
	threshold: number = 0.3
) => {
	const isShowSearchBar = ref(false)

	const cb: IntersectionObserverCallback = entries => {
		entries.forEach(({ isIntersecting }) =>
			isIntersecting ?
				(isShowSearchBar.value = false)
			:	(isShowSearchBar.value = true)
		)
	}
	const option: IntersectionObserverInit = { threshold }
	const observer = new IntersectionObserver(cb, option)

	onMounted(() => {
		if (target.value && isELementRef(target)) observer.observe(target.value)
	})

	onUnmounted(() => observer.disconnect())

	return isShowSearchBar
}

function isELementRef(value: unknown): boolean {
	return isRef(value) && value.value instanceof Element
}
