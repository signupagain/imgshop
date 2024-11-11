import { UserData, UserErrorResponse } from '@/@types/userData'
import { userRequest } from './instance'

export const loginRequest = (hashHex: string) =>
	userRequest<UserData | UserErrorResponse>({
		url: '/login',
		method: 'post',
		data: { hashHex },
	})

export const updateUserData = (
	data: Partial<UserData> & { id: UserData['id'] }
) =>
	userRequest<UserData | UserErrorResponse>({
		url: '/data',
		method: 'put',
		data,
	})
