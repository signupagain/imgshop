import { onBeforeUnmount, onMounted } from 'vue'

export function useEventListener(
	target: unknown | Ref<unknown>,
	event: keyof GlobalEventHandlersEventMap,
	callback: (e?: Event) => void
) {
	if (target instanceof EventTarget) {
		onMounted(() => target.addEventListener(event, callback))
		onBeforeUnmount(() => target.removeEventListener(event, callback))
	}

	if (isRef(target)) {
		onMounted(() => {
			isEventTarget(target.value)
			target.value.addEventListener(event, callback)
		})
		onBeforeUnmount(() => {
			isEventTarget(target.value)
			target.value.removeEventListener(event, callback)
		})
	}
}

function isEventTarget(value: unknown): asserts value is EventTarget {
	if (!(value instanceof EventTarget)) throw new Error('not a EventTarget')
}
