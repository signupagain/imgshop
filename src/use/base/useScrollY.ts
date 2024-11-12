import { useEventListener } from './useEvent'

export default () => {
	const y = ref(scrollY)

	useEventListener(window, 'scroll', () => {
		y.value = scrollY
	})

	return { y }
}
