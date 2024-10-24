export type ImgType = {
	id: string
	ratio: string
	photographerUrl: string
	photographer: string
	src: string
	alt: string
}

export type ResultType = {
	total?: number
	photos: Set<ImgType>
	nextPage: number
	mutiplier: number
	error?: string
}

export type ImgsLibType = Map<string, ResultType | string>
