export default () => {
	const tabClass = 'tab'

	onMounted(() => {
		document
			.querySelectorAll(
				`button:not(.${tabClass}), :any-link:not(.${tabClass}), input:not(.${tabClass}), [tabindex]:not([tabindex="-1"]):not(.${tabClass})`
			)
			.forEach(el => el.setAttribute('tabindex', '-1'))
	})

	return tabClass
}
