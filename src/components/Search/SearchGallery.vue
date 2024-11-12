<template>
	<article class="mx-10 mt-5 flex-1-1">
		<v-empty-state
			v-if="resError"
			:class="utils.empty"
			:image="logo"
			:title="resError"
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
				v-if="noMorePhoto"
				:class="utils.empty"
				:image="logo"
				:title="noMorePhoto"
			></v-empty-state>
			<div v-else :class="$style.deco_box">
				<v-progress-circular
					indeterminate
					size="50"
					width="13"
				></v-progress-circular>
			</div>
		</template>
	</article>
</template>

<script setup lang="ts">
	import usePhotoLoader from '@/use/feedback/usePhotoLoader'
	import useSearchGalleryList from '@/use/layout/useSearchGalleryList'
	import logo from '@/assets/logo.svg'
	import useGalleryTheme from '@/use/feedback/useGalleryTheme'
	import utils from '@/styles/utils.module.scss'
	import useImageStore from '@/stores/useImageStore'
	import { storeToRefs } from 'pinia'
	import { useTranslation } from 'i18next-vue'
	import { NOMOREIMGDATA, NOTHINGHERE } from '@/stores/useImageStore/constants'
	import useRequestDetect from '@/use/request/useRequestDetect'

	defineProps<{ titleTag: string }>()

	const showList = useSearchGalleryList()
	const observeLoading = usePhotoLoader()
	const galleryTitle = useGalleryTheme()

	const { t } = useTranslation('error')
	const imgStore = useImageStore()
	const { responseError, noMorePhotoError } = storeToRefs(imgStore)
	const resError = computed(() =>
		responseError.value ?
			t(responseError.value as ReturnType<() => typeof NOTHINGHERE>)
		:	null
	)
	const noMorePhoto = computed(() =>
		noMorePhotoError.value ?
			t(noMorePhotoError.value as ReturnType<() => typeof NOMOREIMGDATA>)
		:	null
	)

	useRequestDetect()
</script>

<style lang="scss" module>
	.deco_box {
		height: 100px;
		display: grid;
		place-content: center;
	}
</style>
