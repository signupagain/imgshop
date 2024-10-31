import { Directive } from 'vue'

export default () => {
	const vFocus: Directive<HTMLElement> = {
		mounted(el) {
			el.focus()
		},
	}
	return { vFocus }
}
