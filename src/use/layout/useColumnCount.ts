import { useDisplay } from 'vuetify'

export default () => {
	const { smAndUp, mdAndUp, lgAndUp } = useDisplay()
	const arr = [smAndUp, mdAndUp, lgAndUp]
	return computed(() => arr.filter(v => v.value).length || 1)
}
