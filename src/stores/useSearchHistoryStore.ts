import { defineStore } from 'pinia'

const HISTORYNAME = 'historyList'

export default defineStore('searchHistory', () => {
	const historyList: Ref<Array<{ word: string }>> = ref(
		JSON.parse(localStorage.getItem(HISTORYNAME) ?? '[]').map(
			(word: string) => ({ word })
		)
	)

	const outputList = computed(() => [...historyList.value].reverse())

	const recordNewHistory = (history: string) => {
		if (!history || history.trim() === '') return

		deleteSingleHistory(history)
		historyList.value.push({
			word: history,
		})
		localStorage.setItem(
			HISTORYNAME,
			JSON.stringify(historyList.value.map(({ word }) => word))
		)
	}

	const deleteSingleHistory = (history: string) => {
		const index = historyList.value.findIndex(obj => obj.word === history)
		if (index !== -1) historyList.value.splice(index, 1)
	}

	const deleteAllHistory = () => {
		historyList.value = []
		localStorage.removeItem(HISTORYNAME)
	}

	return {
		historyList,
		outputList,
		recordNewHistory,
		deleteSingleHistory,
		deleteAllHistory,
	}
})
