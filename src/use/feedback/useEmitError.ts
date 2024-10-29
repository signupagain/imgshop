export default () => {
	const resError = ref<string | null>(null)
	const emitError = (message: string) => (resError.value = message)
	const resetError = () => (resError.value = null)

	return { resError, emitError, resetError }
}
