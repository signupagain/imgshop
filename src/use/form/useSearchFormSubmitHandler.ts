import useImageStore from '@/stores/useImageStore'
import useSearchHistoryStore from '@/stores/useSearchHistoryStore'

export default (inputValue: Ref<string>, isOpen: Ref<boolean>) => {
	const router = useRouter()
	const { recordNewHistory } = useSearchHistoryStore()
	const imgStore = useImageStore()

	return () => {
		const value = unref(inputValue)

		if (value === '') return

		recordNewHistory(value)

		imgStore.activeTheme = value

		router.push({
			name: '/search',
			query: { theme: value },
		})

		inputValue.value = ''
		isOpen.value = false
	}
}
