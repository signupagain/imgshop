import { ThemesUnionType } from '@/pages/[userID]/cart.vue'
import useUserStore from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import useCartListItems from './useCartListItems'

export default (listKey: Ref<ThemesUnionType>) => {
	const userStore = useUserStore()
	const { shoppingList, historyList } = storeToRefs(userStore)

	const { items, selectedItems } = useCartListItems(listKey)

	const dialog = ref(false)

	const purchaseHandler = () => {
		dialog.value = true

		userStore.money -= items.value.reduce((a, c) => a + c.price, 0)

		listKey.value = 'historyList'
	}

	watch(dialog, v => {
		if (!v) return

		shoppingList.value.forEach(v => historyList.value.push(v))
		shoppingList.value.length = 0
		selectedItems.value.set('shoppingList', [])
	})

	const ISNEEDDIALOG = 'ind'
	const localStatus = localStorage.getItem(ISNEEDDIALOG) === ''

	const isNeedDialog = ref(!localStatus)

	const stopDialog = () => {
		isNeedDialog.value = false
		localStorage.setItem(ISNEEDDIALOG, '')
	}

	return { dialog, isNeedDialog, purchaseHandler, stopDialog }
}
