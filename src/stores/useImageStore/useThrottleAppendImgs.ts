import { throttle } from 'lodash-es'
import values from './values'
import { ResultType } from '@/@types/pexels'
import { searchCuratedRequest, searchRequest } from '@/api/pexels'
import usePhotoHandler from './usePhotoHandler'
import { AxiosError } from 'axios'
import { NOMOREIMGDATA } from './constants'

const appendImgs = () => {
	if ('error' in atp.value) return

	atp.value.mutiplier * quantity.value < atp.value.photos.size ?
		atp.value.mutiplier++
	: atp.value.nextPage === null ? (atp.value.error = NOMOREIMGDATA)
	: activeTheme.value === '' ? useSearchCurated(atp.value, atp.value.nextPage)
	: useSearchRequest(atp.value, atp.value.nextPage, activeTheme.value)

	imgsLib.value.set(activeTheme.value, atp.value)
}

export default throttle(appendImgs, 500)

const { imgsLib, quantity, activeTheme, activeThemeProperty: atp } = values

const useSearchCurated = (property: ResultType, page: number) => {
	searchCuratedRequest(page)
		.then(({ data }) => {
			usePhotoHandler(data.photos).forEach(photo => property.photos.add(photo))
			property.nextPage = data.page + 1

			if (!data.next_page) {
				property.nextPage = null
				property.error = NOMOREIMGDATA
			}
		})
		.catch(errorHandler)
}

const useSearchRequest = (
	property: ResultType,
	page: number,
	activeTheme: string
) => {
	searchRequest(activeTheme, page)
		.then(({ data }) => {
			usePhotoHandler(data.photos).forEach(photo => property.photos.add(photo))

			property.nextPage = data.page + 1

			if (property.total !== data.total_results)
				property.total = data.total_results

			if (!data.next_page) {
				property.nextPage = null
				property.error = NOMOREIMGDATA
			}
		})
		.catch(errorHandler)
}

function errorHandler({ response, message }: AxiosError) {
	response ?
		(atp.value.error = response.statusText)
	:	(atp.value.error = message)

	imgsLib.value.set(activeTheme.value, atp.value)
}
