import { throttle } from 'lodash-es'
import { useEventListener } from '../base/useEvent'

export default (
	frameRef: Ref<HTMLElement | null>,
	photoRef: Ref<HTMLImageElement | null>
) => {
	const throttleZoomPhoto = throttle(zoomPhoto, 30)

	useEventListener(frameRef, 'mousemove', throttleZoomPhoto)

	function zoomPhoto(e?: Event) {
		const ACCURACY = 5
		const PHOTO_MARGIN = 250

		if (e instanceof MouseEvent) {
			isExist(frameRef)
			isExist(photoRef)

			const widthRatio = +(
				((photoRef.value.width + PHOTO_MARGIN * 2) * 1000) /
				frameRef.value.clientWidth /
				1000
			).toFixed(ACCURACY)

			const heightRatio = +(
				((photoRef.value.height + PHOTO_MARGIN * 2) * 1000) /
				frameRef.value.clientHeight /
				1000
			).toFixed(ACCURACY)

			const frameClientRect = frameRef.value.getBoundingClientRect()

			const offsetX = Math.floor(
				((1000 - widthRatio * 1000) / 1000) *
					(e.clientX - frameClientRect.left) +
					PHOTO_MARGIN
			)

			const offsetY = Math.floor(
				((1000 - heightRatio * 1000) / 1000) *
					(e.clientY - frameClientRect.top) +
					PHOTO_MARGIN
			)

			const transform = computed(() => `translate(${offsetX}px,${offsetY}px)`)

			photoRef.value.style.transform = transform.value
		}
	}
}

function isExist(value: unknown): asserts value is Ref<HTMLElement> {
	if (!isRef(value) || (isRef(value) && !(value?.value instanceof HTMLElement)))
		throw new Error('Not a Ref<HTMLElement>')
}
