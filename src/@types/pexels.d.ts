export {}

export interface Params {
	[key: string]: string | number | undefined
}

export interface PaginationParams extends Params {
	per_page?: number
	page?: number
}

interface PaginationObject {
	page: number
	per_page: number
	next_page?: string
}

export interface Photo {
	id: number
	width: number
	height: number
	url: string
	alt: string | null
	avg_color: string | null
	photographer: string
	photographer_url: string
	photographer_id: string
	liked: boolean
	src: {
		original: string
		large2x: string
		large: string
		medium: string
		small: string
		portrait: string
		landscape: string
		tiny: string
	}
}

export type Photos = PaginationObject & {
	photos: Photo[]
}

export type PhotosWithTotalResults = Photos & {
	total_results: number
}

export type ImgType = {
	id: string
	width: string
	height: string
	ratio: string
	photographerUrl: string
	photographer: string
	src: string
	url: string
	alt: string
	isLoading: boolean
}

export type ResultType = {
	total?: number
	photos: Set<ImgType>
	nextPage: number | null
	mutiplier: number
	error?: string
}

export interface ErrorResponse {
	error: string
}

export type ImgsLibType = Map<string, ResultType | ErrorResponse>
