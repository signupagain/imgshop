import axios from 'axios'

export const pexelsRequest = axios.create({
	baseURL: '/api',
	timeout: 5000,
	headers: {
		Authorization: import.meta.env.VITE_PEXELS_API_AUTH_KEY,
	},
})
