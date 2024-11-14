import { UserItems } from '@/@types/userData'
import useNanoId from '@/use/base/useNanoId'

const ID = 'shop_id'

const id = ref(localStorage.getItem(ID) ?? useNanoId())
const name = computed({
	get: () => id.value,
	set: value => (id.value = value),
})

const money = ref(2000)
const isUser = ref(false)

const shoppingList = ref<UserItems>([])

const historyList = ref<UserItems>([])

const historyIdList = computed(() => historyList.value.map(({ id }) => id))

watch(historyList, v => {
	if (v.length < 30) return

	historyList.value.shift()
})

const collectionList = ref<UserItems>([])

export default {
	id,
	name,
	money,
	isUser,
	shoppingList,
	historyList,
	historyIdList,
	collectionList,
}
