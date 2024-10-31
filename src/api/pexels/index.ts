import { Photos, PhotosWithTotalResults } from '@/@types/pexels'
import { pexelsRequest } from './Instance'

const LOCALE = 'zh-TW'
const PER_PAGE = 80

export const searchRequest = (query: string, page?: number) =>
	pexelsRequest<PhotosWithTotalResults>({
		url: '/search',
		params: { query, page, locle: LOCALE, per_page: PER_PAGE },
	})

export const searchCuratedRequest = (page?: number) =>
	pexelsRequest<Photos>({
		url: '/curated',
		params: { page, per_page: PER_PAGE },
	})
