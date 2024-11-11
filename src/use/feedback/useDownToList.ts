import { VList } from 'vuetify/components'

export default (vlist: Ref<InstanceType<typeof VList> | null>) => () => {
	if (
		vlist.value?.$el instanceof Element &&
		vlist.value.$el.firstElementChild instanceof HTMLElement
	)
		vlist.value.$el.firstElementChild.focus()
}
