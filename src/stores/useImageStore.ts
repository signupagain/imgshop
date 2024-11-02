import { ImgsLibType, ImgType, Photo, ResultType } from '@/@types/pexels'
import { searchCuratedRequest, searchRequest } from '@/api/pexels'
import { AxiosError } from 'axios'
import { throttle } from 'lodash-es'
import { defineStore } from 'pinia'

export default defineStore('imgaeStore', () => {
	const imgsLib = ref<ImgsLibType>(new Map())

	const activeTheme = ref('')
	const activeThemeProperty = computed(() => {
		const data = imgsLib.value.get(activeTheme.value)
		return data ?? ''
	})

	const quantity = ref(15)
	const photoList = computed(() =>
		typeof activeThemeProperty.value !== 'string' ?
			Array.from(activeThemeProperty.value.photos).slice(
				0,
				activeThemeProperty.value.mutiplier * quantity.value
			)
		:	[]
	)

	watch(activeTheme, val => requestImgs(val), { immediate: true })

	watch(imgsLib, val => {
		if (val.size > 10) {
			const oldestSearchPair = [...val.entries()][1]

			val.delete(oldestSearchPair[0])
		}
	})

	function throttleAppendImgs(timeout: number) {
		return throttle(appendImgs, timeout)
	}

	function requestImgs(word: string = '') {
		activeTheme.value = word

		if (imgsLib.value.has(word)) {
			activeTheme.value = word
			return
		}

		word === '' ? useSearchCurated() : useSearchRequest()

		function useSearchCurated() {
			searchCuratedRequest()
				.then(({ data }) => {
					const response: ResultType = {
						photos: photoHandler(data.photos),
						nextPage: data.next_page ? data.page + 1 : null,
						mutiplier: 1,
					}

					imgsLib.value.set(activeTheme.value, response)
				})
				.catch(errorHandler)
		}

		function useSearchRequest() {
			searchRequest(activeTheme.value)
				.then(({ data }) => {
					const response: ResultType = {
						photos: photoHandler(data.photos),
						nextPage: data.next_page ? data.page + 1 : null,
						total: data.total_results,
						mutiplier: 1,
					}

					imgsLib.value.set(activeTheme.value, response)
				})
				.catch(errorHandler)
		}

		function errorHandler({ message }: AxiosError) {
			return imgsLib.value.set(activeTheme.value, message)
		}
	}

	function appendImgs() {
		const property = imgsLib.value.get(activeTheme.value)

		if (property && typeof property !== 'string') {
			property.mutiplier * quantity.value < property.photos.size ?
				property.mutiplier++
			: property.nextPage === null ? (property.error = '已經沒有圖片了')
			: activeTheme.value === '' ? useSearchCurated(property, property.nextPage)
			: useSearchRequest(property, property.nextPage, activeTheme.value)

			imgsLib.value.set(activeTheme.value, property)
		}

		function useSearchCurated(property: ResultType, page: number) {
			searchCuratedRequest(page)
				.then(({ data }) => {
					photoHandler(data.photos).forEach(photo => property.photos.add(photo))
					property.nextPage = data.page + 1
				})
				.catch(errorHandler)
		}

		function useSearchRequest(
			property: ResultType,
			page: number,
			activeTheme: string
		) {
			searchRequest(activeTheme, page)
				.then(({ data }) => {
					photoHandler(data.photos).forEach(photo => property.photos.add(photo))
					property.nextPage = data.page + 1
					if (property.total !== data.total_results)
						property.total = data.total_results
				})
				.catch(errorHandler)
		}

		function errorHandler({ message }: AxiosError) {
			if (property && typeof property !== 'string') property.error = message
		}
	}

	function photoHandler(photos: Photo[]): Set<ImgType> {
		return new Set(
			photos.map(
				({
					id,
					width,
					height,
					photographer_url: photographerUrl,
					photographer,
					src,
					alt,
				}) => ({
					id: `${id}`,
					width: `${width}`,
					height: `${height}`,
					ratio: (width / height).toFixed(5),
					photographerUrl,
					photographer,
					src: src.large2x,
					alt: alt ?? '',
					isLoading: true,
				})
			)
		)
	}

	return {
		quantity,
		activeTheme,
		activeThemeProperty,
		imgsLib,
		photoList,
		throttleAppendImgs,
	}
})
