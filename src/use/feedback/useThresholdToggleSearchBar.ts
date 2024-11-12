import { ShallowRef } from 'vue'

export const isShow = ref(false)

export default (
	target: ShallowRef<Element | null>,
	threshold: number = 0.3
) => {
	const option: IntersectionObserverInit = { threshold }
	const cb: IntersectionObserverCallback = entries =>
		entries.forEach(({ isIntersecting }) => (isShow.value = !isIntersecting))

	const observer = new IntersectionObserver(cb, option)

	onMounted(() => {
		if (target.value instanceof Element) observer.observe(target.value)
	})

	onUnmounted(() => observer.disconnect())
}
