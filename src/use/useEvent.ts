import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
	target: unknown,
	event: keyof GlobalEventHandlersEventMap,
	callback: () => void
) {
	if (target instanceof EventTarget) {
		onMounted(() => target.addEventListener(event, callback))
		onUnmounted(() => target.removeEventListener(event, callback))
	}
}
