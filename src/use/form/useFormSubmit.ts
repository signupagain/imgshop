import { VBtn, VForm } from 'vuetify/components'

type SubmitBtn = HTMLInputElement | HTMLButtonElement | typeof VBtn

export default (formRef: string = 'form', submitRef: string = 'submit') => {
	const form = useTemplateRef<typeof VForm>(formRef)
	const submit = useTemplateRef<SubmitBtn>(submitRef)

	return () => {
		if (form.value && submit.value)
			submit.value instanceof HTMLElement ?
				form.value.$el.requestSubmit(submit.value)
			:	form.value.$el.requestSubmit(submit.value.$el)
	}
}
