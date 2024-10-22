import { useTheme } from 'vuetify'

export default () => {
	const current = useTheme().current
	return computed(() => current.value.dark)
}
