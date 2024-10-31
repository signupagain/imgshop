import { ImgType, Photo } from '@/@types/pexels'

export default (photos: Photo[]): Set<ImgType> =>
	new Set(
		photos.map(
			({
				id,
				width,
				height,
				photographer_url: photographerUrl,
				photographer,
				url,
				src,
				alt,
			}) => ({
				id: `${id}`,
				width: `${width}`,
				height: `${height}`,
				ratio: (width / height).toFixed(5),
				photographerUrl,
				photographer,
				url,
				src: src.large2x,
				alt: alt ?? '',
				isLoading: true,
			})
		)
	)
