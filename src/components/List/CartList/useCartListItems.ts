import { UserItem } from '@/@types/userData'
import { ThemesUnionType } from '@/pages/[userID]/cart.vue'
import useUserStore from '@/stores/useUserStore'
import { useTranslation } from 'i18next-vue'

export type SelectedItemsType = Map<
	ThemesUnionType,
	Array<UserItem & { selectable: boolean; checked: boolean }>
>

export default (key: Ref<ThemesUnionType>) => {
	const userStore = useUserStore()

	const items = computed(() =>
		Array.from(userStore[key.value])
			.map(obj => Object.assign(obj, { selectable: true, checked: false }))
			.reverse()
	)

	const affordable = computed(
		() =>
			items.value
				.map(({ price }) => price)
				.reduce((a, c) => (c ? a + c : a), 0) <= userStore.money
	)

	const { t } = useTranslation('cart')
	const tooltip = computed(() =>
		items.value.length === 0 ? t('noData')
		: !affordable.value ? t('insufficient')
		: ''
	)

	const selectedItems = ref<SelectedItemsType>(new Map())

	const currentSelectedItems = computed({
		get: () => selectedItems.value.get(key.value) ?? [],
		set: val => selectedItems.value.set(key.value, val),
	})

	const allSelected = computed(
		() =>
			currentSelectedItems.value.length === items.value.length &&
			currentSelectedItems.value.length > 0
	)

	const someSelected = computed(
		() => currentSelectedItems.value.length > 0 && !allSelected.value
	)

	const selectAll = (isNotAllSelected: boolean) => {
		currentSelectedItems.value.length = 0

		if (isNotAllSelected) currentSelectedItems.value = [...items.value]
	}

	const deleteSelectedItems = () => {
		currentSelectedItems.value.forEach(({ id }) =>
			userStore.spliceList(key.value, id)
		)
		currentSelectedItems.value.length = 0

		selectedItems.value.set(key.value, currentSelectedItems.value)
	}

	return {
		items,
		tooltip,
		selectedItems,
		allSelected,
		someSelected,
		currentSelectedItems,
		selectAll,
		deleteSelectedItems,
	}
}
