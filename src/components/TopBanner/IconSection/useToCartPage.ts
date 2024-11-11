import useUserStore from '@/stores/useUserStore'

export default () => {
	const router = useRouter()
	const userStore = useUserStore()

	return () =>
		router.push({ name: '/[userID]/cart', params: { userID: userStore.name } })
}
