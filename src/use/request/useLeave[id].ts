import useImageStore from '@/stores/useImageStore'

export default () => {
	const router = useRouter()
	const imgStore = useImageStore()

	return () =>
		imgStore.activeTheme === '' ?
			router.push('/')
		:	router.push({ name: '/search', query: { theme: imgStore.activeTheme } })
}
