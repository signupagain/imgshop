import { useTheme } from 'vuetify'
import useChangeTheme from './useChangeTheme'
import { useEventListener } from '../base/useEvent'

export default (mode: string = 'dark') => {
	if (window.matchMedia) {
		const prefersColorSchemeMedia = window.matchMedia(
			`(prefers-color-scheme: ${mode})`
		)
		const oppositeMode = ['light', 'dark'].find(v => v !== mode)
		const changeTheme = useChangeTheme()

		onMounted(() => {
			const { global } = useTheme()
			if (!prefersColorSchemeMedia.matches && oppositeMode)
				global.name.value = oppositeMode
		})

		useEventListener(prefersColorSchemeMedia, 'change', changeTheme)
	}
}
