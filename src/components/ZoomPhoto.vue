<template>
	<div ref="frame" :class="$style.zoom" @click="emit('toggleZoom')">
		<img
			ref="img"
			:alt="photo?.alt"
			class="position-absolute"
			:src="photo?.src"
			:style="{ '--ratio': photo?.ratio }"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ImgType } from '@/@types/pexels'
	import useZoomPhoto from '@/use/feedback/useZoomPhoto'

	defineProps<{ photo?: ImgType }>()

	const emit = defineEmits<{
		toggleZoom: []
	}>()

	const frame = useTemplateRef('frame')
	const img = useTemplateRef('img')
	useZoomPhoto(frame, img)
</script>

<style lang="scss" module>
	.zoom {
		border: solid currentColor;

		width: 100%;
		height: 65%;
		overflow: hidden;
		position: relative;
		cursor: zoom-out;
	}
</style>
