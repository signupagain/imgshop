export default (inputValue: string) => {
	const router = useRouter()
	return () => {
		// from useImgsStore
		const searchImgs = (str: string) => console.log('searchImgs ' + str)
		// from useHistoryStore
		const recordHistory = (str: string) => console.log('record ' + str)

		searchImgs(inputValue)
		recordHistory(inputValue)
		router.push({})
	}
}
