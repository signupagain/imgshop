import { UserData } from '@/@types/userData'
import values from './values'
import updateServerData from './updateServerData'

const { isUser, id, name, collectionList, shoppingList } = values

export default (data: UserData) => {
	isUser.value = true
	id.value = data.id
	name.value = data.name

	data.collectionList.forEach(v => collectionList.value.add(v))

	data.shoppingList.forEach(v => shoppingList.value.add(v))

	updateServerData({ shoppingList: data.shoppingList })
}
