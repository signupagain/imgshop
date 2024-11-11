<template>
	<v-dialog
		v-if="isShowSearchBar"
		v-model="isOpenDialog"
		max-height="600"
		max-width="500"
	>
		<template #activator="{ props: activatorProps }">
			<v-btn
				v-bind="activatorProps"
				:class="{ 'order-1': !smAndUp }"
				icon="fas fa-magnifying-glass"
				:text="t('search')"
				:title="t('search')"
			></v-btn>
		</template>
		<template #default="{ isActive }">
			<v-card max-height="70dvh" :title="t('searchDialog.title')">
				<v-card-text>
					<v-form ref="form" @submit.prevent="submitHandler">
						<v-text-field
							ref="input"
							v-model="inputValue"
							hide-details
							variant="outlined"
							@keydown.down.prevent="downToList"
							@keydown.enter.prevent="triggerSubmit"
						>
							<template #prepend-inner>
								<v-icon icon="fas fa-magnifying-glass" size="small"></v-icon>
							</template>
						</v-text-field>
						<button ref="submit" :class="utils.hidden" tabindex="-1"></button>
					</v-form>
					<v-list
						ref="vlist"
						class="overflow-auto pa-0"
						max-height="30dvh"
						max-width="100%"
						tag="ul"
					>
						<v-list-item
							v-for="{ word: title } of showList"
							:key="title"
							tabindex="0"
							tag="li"
							:title
							@click="clickListItem(title)"
						>
							<template #append>
								<v-btn
									icon="fas fa-circle-xmark"
									@click.stop="deleteSingleHistory(title)"
								></v-btn>
							</template>
						</v-list-item>
					</v-list>
				</v-card-text>
				<v-card-actions>
					<v-btn
						:text="t('searchDialog.close')"
						@click="isActive.value = false"
					></v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script setup lang="ts">
	import utils from '@/styles/utils.module.scss'
	import { useTranslation } from 'i18next-vue'
	import { useDisplay } from 'vuetify'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useSearchFormSubmitHandler'
	import useSearchHistoryStore from '@/stores/useSearchHistoryStore'
	import { VForm, VList } from 'vuetify/components'
	import { TOGGLE_SEARCHBAR, TOGGLE_SEARCHBAR_TYPE } from '@/key'
	import useDownToList from '@/use/feedback/useDownToList'

	const { t } = useTranslation('topbanner')

	const { smAndUp, mdAndUp } = useDisplay()
	const { isIntersecting } = inject<TOGGLE_SEARCHBAR_TYPE>(TOGGLE_SEARCHBAR)!
	const route = useRoute()
	const isShowSearchBar = computed(() => {
		if (route.name === '/') return !mdAndUp.value && isIntersecting.value

		const exception = ['/cart', '/login', '/register']
		if (exception.includes(route.name)) return false

		return !mdAndUp.value
	})

	const inputValue = ref('')
	const isOpenDialog = ref(false)

	const history = useSearchHistoryStore()
	const showList = computed(() =>
		history.outputList.filter(({ word }) => word !== inputValue.value)
	)

	const deleteSingleHistory = history.deleteSingleHistory

	const form = useTemplateRef('form')
	const submit = useTemplateRef('submit')
	const triggerSubmit = useFormSubmit(form, submit)
	const submitHandler = useFormSubmitHandler(inputValue, isOpenDialog)

	const clickListItem = (word: string) => {
		inputValue.value = word
		triggerSubmit()
	}
	const downToList = useDownToList(useTemplateRef('vlist'))
</script>

<style scoped></style>
