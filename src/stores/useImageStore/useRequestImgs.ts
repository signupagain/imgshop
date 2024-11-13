import { ResultType } from '@/@types/pexels'
import values from './values'
import { AxiosError } from 'axios'
import { searchCuratedRequest, searchRequest } from '@/api/pexels'
import usePhotoHandler from './usePhotoHandler'
import { NOMOREIMGDATA, NOTHINGHERE } from './constants'

export default (word: string = '') => {
	activeTheme.value = word

	if (imgsLib.value.has(word)) {
		activeTheme.value = word
		return
	}

	word === '' ? useSearchCurated() : useSearchRequest()
}

const { activeTheme, imgsLib } = values

function useSearchCurated() {
	searchCuratedRequest()
		.then(({ data }) => {
			const response: ResultType = {
				photos: usePhotoHandler(data.photos),
				nextPage: data.next_page ? data.page + 1 : null,
				mutiplier: 1,
			}

			if (!response.nextPage) response.error = NOMOREIMGDATA

			imgsLib.value.set(activeTheme.value, response)
		})
		.catch(errorHandler)
}

function useSearchRequest() {
	searchRequest(activeTheme.value)
		.then(({ data }) => {
			const response: ResultType = {
				photos: usePhotoHandler(data.photos),
				nextPage: data.next_page ? data.page + 1 : null,
				total: data.total_results,
				mutiplier: 1,
			}

			if (response.photos.size === 0) response.error = NOTHINGHERE
			else if (!response.nextPage) response.error = NOMOREIMGDATA

			imgsLib.value.set(activeTheme.value, response)
		})
		.catch(errorHandler)
}

function errorHandler({ response, message }: AxiosError) {
	response ?
		imgsLib.value.set(activeTheme.value, { error: response.statusText })
	:	imgsLib.value.set(activeTheme.value, { error: message })
}
