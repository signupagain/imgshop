export default () => {
	const tabClass = 'tab'

	onMounted(() => {
		document
			.querySelectorAll(
				`button:not(.${tabClass}), :any-link, input, [tabindex]:not([tabindex="-1"])`
			)
			.forEach(el => el.setAttribute('tabindex', '-1'))
	})

	return tabClass
}
