import { loginRequest } from '@/api/user'
import useSHA256 from '@/use/base/useSHA256'
import setUserData from './setUserData'

export default async (name: string, password: string) => {
	const salt = 'fighting'
	const word = name + salt + password
	const hashHex = await useSHA256(word)

	const { data } = await loginRequest(hashHex)

	if ('error' in data) throw new Error('ERROR: fail login in UserStore')

	setUserData(data)
}
