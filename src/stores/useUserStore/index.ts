import { defineStore } from 'pinia'
import values from './values'
import login from './login'
import setUserData from './setUserData'
import { appendList, spliceList } from './editCartList'

export default defineStore('userStore', () => ({
	...values,
	login,
	setUserData,
	appendList,
	spliceList,
}))
