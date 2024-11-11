import { VBtn, VForm } from 'vuetify/components'

type SubmitBtn =
	| HTMLInputElement
	| HTMLButtonElement
	| InstanceType<typeof VBtn>

export default (
		formRef: Ref<InstanceType<typeof VForm> | null>,
		submitRef: Ref<SubmitBtn | null>
	) =>
	() => {
		if (formRef.value && submitRef.value)
			submitRef.value instanceof HTMLElement ?
				formRef.value.$el.requestSubmit(submitRef.value)
			:	formRef.value.$el.requestSubmit(submitRef.value.$el)
	}
