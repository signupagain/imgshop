import { useTheme } from 'vuetify'

export default (
	toLightIcon: string = 'fas fa-sun',
	toDarkIcon: string = 'fas fa-moon'
) => {
	const { global } = useTheme()
	return computed(() => (global.current.value.dark ? toLightIcon : toDarkIcon))
}
