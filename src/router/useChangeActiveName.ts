import useImageStore from '@/stores/useImageStore'
import { NavigationHookAfter } from 'vue-router'

export default (({ query: toQuery }, { query: fromQuery }) => {
	if (!toQuery.theme || !fromQuery.theme || toQuery.theme === fromQuery.theme)
		return

	const imgStore = useImageStore()
	const { theme } = toQuery
	if (typeof theme === 'string') imgStore.activeTheme = theme
}) as NavigationHookAfter
