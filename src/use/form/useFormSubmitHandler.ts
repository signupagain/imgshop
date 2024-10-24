import useImageStore from '@/stores/useImageStore'
import useSearchHistoryStore from '@/stores/useSearchHistoryStore'

export default (inputValue: Ref<string>) => {
	const router = useRouter()
	const searchImgs = useImageStore().throttleRequestImgs(500)
	const { recordNewHistory } = useSearchHistoryStore()
	return () => {
		if (inputValue.value) {
			searchImgs(inputValue.value)
			recordNewHistory(inputValue.value)
			router.push({})
		}
	}
}
