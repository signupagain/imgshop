import { ImgType } from '@/@types/pexels'
import values from './values'
import { ThemesUnionType } from '@/pages/[userID]/cart.vue'

export const appendList = (
	key: ThemesUnionType,
	{ id, photographer, src, alt }: ImgType
) => {
	spliceList(key, id)

	values[key].value.push({
		id,
		photographer,
		src,
		title: alt || '精選圖片',
		price: +id.slice(-3),
	})
}

export const spliceList = (key: ThemesUnionType, targetId: string) => {
	const index = values[key].value.findIndex(({ id }) => id === targetId)

	if (index !== -1) values[key].value.splice(index, 1)
}
