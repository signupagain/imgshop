import { ImgsLibType } from '@/@types/pexels'

const imgsLib = ref<ImgsLibType>(new Map())

const activeTheme = ref('')
const activeThemeProperty = computed(() => {
	const data = imgsLib.value.get(activeTheme.value)

	return data ?? { error: '' }
})

const responseError = computed(() => {
	if (!activeThemeProperty.value) return null

	const length = Object.keys(activeThemeProperty.value).length

	return length === 1 ? activeThemeProperty.value.error : null
})

const noMorePhotoError = computed(() => {
	return (
			'photos' in activeThemeProperty.value &&
				'error' in activeThemeProperty.value
		) ?
			activeThemeProperty.value.error
		:	null
})

const quantity = ref(15)
const photoList = computed(() =>
	activeThemeProperty.value && 'photos' in activeThemeProperty.value ?
		Array.from(activeThemeProperty.value.photos).slice(
			0,
			activeThemeProperty.value.mutiplier * quantity.value
		)
	:	[]
)

export default {
	imgsLib,
	activeTheme,
	activeThemeProperty,
	responseError,
	noMorePhotoError,
	quantity,
	photoList,
}
