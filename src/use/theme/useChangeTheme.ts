import { useTheme } from 'vuetify'

export default () => {
	const theme = useTheme()

	return () =>
		(theme.global.name.value =
			theme.global.current.value.dark ? 'light' : 'dark')
}
