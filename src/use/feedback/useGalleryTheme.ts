import useImageStore from '@/stores/useImageStore'
import { useTranslation } from 'i18next-vue'
import { storeToRefs } from 'pinia'

export default () => {
	const { t } = useTranslation()
	const route = useRoute()
	const imgStore = useImageStore()
	const { activeTheme } = storeToRefs(imgStore)

	watch(
		() => route.name,
		val =>
			val !== '/photo/[id]' ?
				val === '/search' && typeof route.query.theme === 'string' ?
					(activeTheme.value = route.query.theme)
				:	(activeTheme.value = '')
			:	null,
		{ immediate: true }
	)

	return computed(() =>
		activeTheme.value === '' ?
			t('images.title')
		:	t('images.result', { theme: activeTheme.value })
	)
}
