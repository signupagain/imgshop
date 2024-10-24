import { createClient } from 'pexels'

const client = createClient(import.meta.env.VITE_PEXELS_API_AUTH_KEY)

const LOCALE = 'zh-TW'
const PER_PAGE = 80
const PARAMETERS = { locale: LOCALE, per_page: PER_PAGE }

export const searchRequest = (query: string, page?: number) =>
	client.photos.search({ query, page, ...PARAMETERS })

export const searchCurated = (page?: number) =>
	client.photos.curated({ page, per_page: PER_PAGE })
