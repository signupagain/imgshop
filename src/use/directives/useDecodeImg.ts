export default () => {
	const error = ref<string>()
	const vDecodeImg = {
		beforeMount(el: unknown) {
			if (!(el instanceof HTMLImageElement))
				throw new Error('useDecodeImg only accept HTMLImageElement.')

			el.decode().catch(({ message }: DOMException) => (error.value = message))
		},
	}

	return { error, vDecodeImg }
}
