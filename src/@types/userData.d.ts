export {}

export interface UserItem {
	title: string
	photographer: string
	src: string
	price: number
	id: string
}

export type UserItems = Array<UserItem>

export interface UserErrorResponse {
	error: string
}

export interface UserData {
	id: string
	name: string
	money: number
	shoppingList: UserItems
	collectionList: UserItems
}
