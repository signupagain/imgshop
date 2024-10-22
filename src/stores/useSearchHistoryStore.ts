import { defineStore } from 'pinia'

export default defineStore('searchHistory', () => {
	const historyName = 'historyList'

	const historyList: Ref<Array<{ word: string }>> = ref(
		JSON.parse(localStorage.getItem(historyName) ?? '[]').map(
			(word: string) => ({ word })
		)
	)

	const outputList = computed(() => [...historyList.value].reverse())

	function recordNewHistory(history: string) {
		if (!history || history.trim() === '') return

		deleteSingleHistory(history)
		historyList.value.push({
			word: history,
		})
		localStorage.setItem(
			historyName,
			JSON.stringify(historyList.value.map(({ word }) => word))
		)
	}

	function deleteSingleHistory(history: string) {
		const index = historyList.value.findIndex(obj => obj.word === history)
		if (index !== -1) historyList.value.splice(index, 1)
	}

	function deleteAllHistory() {
		historyList.value = []
		localStorage.removeItem(historyName)
	}

	return {
		historyList,
		outputList,
		recordNewHistory,
		deleteSingleHistory,
		deleteAllHistory,
	}
})
