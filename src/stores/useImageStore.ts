import { ImgsLibType, ImgType, ResultType } from '@/@types/pexels'
import { searchCurated, searchRequest } from '@/api/pexels'
import useEmitError from '@/use/feedback/useEmitError'
import { throttle } from 'lodash-es'
import { Photo } from 'pexels'
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
			searchCurated()
				.then(res => {
					if ('error' in res) throw Error(res.error)

					const response: ResultType = {
						photos: photoHandler(res.photos),
						nextPage: res.page + 1,
						mutiplier: 1,
					}

					imgsLib.value.set(activeTheme.value, response)
				})
				.catch(errorHandler)
		}

		function useSearchRequest() {
			searchRequest(activeTheme.value)
				.then(res => {
					if ('error' in res) throw Error(res.error)

					const response: ResultType = {
						photos: photoHandler(res.photos),
						nextPage: res.page + 1,
						total: res.total_results,
						mutiplier: 1,
					}

					imgsLib.value.set(activeTheme.value, response)
				})
				.catch(errorHandler)
		}

		function errorHandler({ message }: Error) {
			return imgsLib.value.set(activeTheme.value, message)
		}
	}

	function appendImgs() {
		const { resetError, emitError } = useEmitError()
		const data = imgsLib.value.get(activeTheme.value)

		if (data && typeof data !== 'string') {
			resetError()

			if (data.mutiplier * quantity.value < data.photos.size) {
				data.mutiplier++
				return
			}

			activeTheme.value === '' ?
				useSearchCurated(data, data.nextPage)
			:	useSearchRequest(data, data.nextPage, activeTheme.value)

			imgsLib.value.set(activeTheme.value, data)
		}

		function useSearchCurated(data: ResultType, page: number) {
			searchCurated(page)
				.then(res => {
					if ('error' in res) throw Error(res.error)

					photoHandler(res.photos).forEach(photo => data.photos.add(photo))
					data.nextPage = res.page + 1
				})
				.catch(errorHandler)
		}

		function useSearchRequest(
			data: ResultType,
			page: number,
			activeTheme: string
		) {
			searchRequest(activeTheme, page)
				.then(res => {
					if ('error' in res) throw Error(res.error)

					photoHandler(res.photos).forEach(photo => data.photos.add(photo))
					data.nextPage = res.page + 1
					if (data.total !== res.total_results) data.total = res.total_results
				})
				.catch(errorHandler)
		}

		function errorHandler({ message }: Error) {
			if (data && typeof data !== 'string') {
				data.error = message
				emitError(data.error)
			}
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
