<template>
	<article class="mx-10 mt-10">
		<v-empty-state
			v-if="emptyResult"
			:image="logo"
			:title="emptyResult"
		></v-empty-state>
		<template v-else>
			<component
				:is="titleTag"
				class="text-h5 text-sm-h4 text-md-h3 my-2 my-sm-4 ma-md-8 font-weight-bold"
			>
				{{ galleryTitle }}
			</component>
			<div class="d-flex ga-5">
				<section
					v-for="(items, cols) of showList"
					:key="cols"
					class="flex-1-0-0"
				>
					<ul class="d-flex flex-column ga-5" style="list-style: none">
						<li v-for="item of items" :key="item.id">
							<search-card :item :observe-loading></search-card>
						</li>
					</ul>
				</section>
			</div>
			<v-empty-state
				v-if="resError"
				:image="logo"
				:title="resError"
			></v-empty-state>
			<div v-else :class="$style.deco_box">
				<v-progress-circular
					indeterminate
					size="50"
					width="13"
				></v-progress-circular>
			</div>
			<div ref="target" :class="$style.request_box"></div>
		</template>
	</article>
</template>

<script setup lang="ts">
	import usePhotoLoader from '@/use/feedback/usePhotoLoader'
	import useSearchGalleryList from '@/use/layout/useSearchGalleryList'
	import useRequestDetect from '@/use/request/useRequestDetect'
	import logo from '@/assets/logo.svg'
	import useEmptyResult from '@/use/feedback/useEmptyResult'
	import useEmitError from '@/use/feedback/useEmitError'
	import useGalleryTheme from '@/use/feedback/useGalleryTheme'

	defineProps<{ titleTag: string }>()

	const showList = useSearchGalleryList()
	const observeLoading = usePhotoLoader()
	const emptyResult = useEmptyResult()
	const { resError } = useEmitError()
	const galleryTitle = useGalleryTheme()

	useRequestDetect(useTemplateRef('target'))
</script>

<style lang="scss" module>
	.request_box {
		position: absolute;
		inset: auto 0 0;
		z-index: -1;
		height: 200dvh;
	}

	.deco_box {
		height: 100px;
		display: grid;
		place-content: center;
	}
</style>
