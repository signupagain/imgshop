import useImageStore from '@/stores/useImageStore'
import { storeToRefs } from 'pinia'
import useColumnCount from './useColumnCount'
import { ImgType } from '@/@types/pexels'

export default () => {
	const imgStore = useImageStore()
	const { photoList } = storeToRefs(imgStore)
	const cols = useColumnCount()

	const list = computed(() => {
		if (cols.value === 1) return [photoList.value]

		const container: ImgType[][] = [...new Array(cols.value)].map(() => [])
		let isAdd = true

		for (let i = 0, pos = 0; i < photoList.value.length; i++) {
			container[pos].push(photoList.value[i])

			isAdd ? pos++ : pos--

			if (pos >= cols.value || pos <= -1) isAdd = !isAdd
			if (pos >= cols.value) pos--
			if (pos <= -1) pos++
		}

		return container
	})

	return list
}
