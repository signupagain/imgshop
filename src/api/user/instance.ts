import axios from 'axios'

export const userRequest = axios.create({
	baseURL: '/api/user',
	timeout: 5000,
})
