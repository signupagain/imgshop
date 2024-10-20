import useSearchHistoryStore from '@/stores/useSearchHistoryStore'

export default (inputValue: Ref<string>) => {
	const router = useRouter()
	// from useImgsStore
	const searchImgs = (str: string) => console.log('searchImgs ' + str)
	const { recordNewHistory } = useSearchHistoryStore()
	return () => {
		if (inputValue.value) {
			searchImgs(inputValue.value)
			recordNewHistory(inputValue.value)
			router.push({})
		}
	}
}
