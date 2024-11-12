import useImageStore from '@/stores/useImageStore'
import useScrollY from '../base/useScrollY'

const DISTANCE = innerHeight * 4
const { appendImgs } = useImageStore()

export default () => {
	const { y } = useScrollY()

	onMounted(() => {
		const isAppendImg = computed(
			() => document.body.scrollHeight - y.value < DISTANCE
		)

		watch(
			isAppendImg,
			val => {
				if (val) appendImgs()
			},
			{ immediate: true }
		)
	})
}
