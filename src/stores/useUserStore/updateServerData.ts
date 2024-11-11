import { UserData } from '@/@types/userData'
import { updateUserData } from '@/api/user'
import values from './values'

const { id } = values

export default (data: Partial<UserData>) =>
	updateUserData({ id: id.value, ...data })
