<template>
	<v-form ref="form" @submit.prevent="submitHandler">
		<v-autocomplete
			v-model:menu="isOpenMenu"
			v-model:search="inputValue"
			autofocus
			clear-on-select
			close-text="Search"
			density="compact"
			hide-details
			hide-no-data
			hide-selected
			item-title="word"
			item-value="word"
			:items="history.outputList"
			menu-icon=""
			:menu-props="{ maxHeight: 200 }"
			name="search"
			single-line
			variant="solo-filled"
			@keydown.enter.prevent="triggerSubmit"
		>
			<template #append-inner>
				<v-btn
					ref="submit"
					:aria-label="t('search')"
					icon="fas fa-magnifying-glass"
					size="small"
					type="submit"
					@click="triggerSubmit"
				></v-btn>
			</template>
			<template #item="{ props, item }">
				<v-list-item v-bind="props" @click="clickListItem(item.title)">
					<template #append>
						<v-btn
							icon="fas fa-circle-xmark"
							@click.stop="history.deleteSingleHistory(item.title)"
							@keydown.stop.enter="history.deleteSingleHistory(item.title)"
						></v-btn>
					</template>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-form>
</template>

<script setup lang="ts">
	import useSearchHistoryStore from '@/stores/useSearchHistoryStore'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useSearchFormSubmitHandler'
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	const inputValue = ref('')
	const isOpenMenu = ref(false)
	const history = useSearchHistoryStore()
	const form = useTemplateRef('form')
	const submit = useTemplateRef('submit')
	const triggerSubmit = useFormSubmit(form, submit)
	const submitHandler = useFormSubmitHandler(inputValue, isOpenMenu)

	function clickListItem(word: string) {
		inputValue.value = word
		triggerSubmit()
	}
</script>
