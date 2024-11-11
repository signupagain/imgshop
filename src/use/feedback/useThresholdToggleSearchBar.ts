import { ShallowRef } from 'vue'

export default (
	target: ShallowRef<Element | null>,
	threshold: number = 0.3
) => {
	const isShow = ref(false)

	const option: IntersectionObserverInit = { threshold }
	const cb: IntersectionObserverCallback = entries =>
		entries.forEach(
			({ isIntersecting }) => (isShow.value = !isIntersecting)
		)

	const observer = new IntersectionObserver(cb, option)

	onMounted(() => {
		if (target.value instanceof Element) observer.observe(target.value)
	})

	onUnmounted(() => observer.disconnect())

	return isShow
}
