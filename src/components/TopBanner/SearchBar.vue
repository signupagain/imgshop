<template>
	<v-form ref="form" @submit.prevent="submitHandler">
		<v-autocomplete
			v-model="inputValue"
			append-inner-icon="fas fa-magnifying-glass"
			close-text="Search"
			density="compact"
			hide-details
			hide-no-data
			hide-selected
			item-title="word"
			item-value="word"
			:items="history.outputList"
			menu-icon=""
			name="search"
			placeholder="PLACEHOLDER"
			single-line
			variant="outlined"
			@click:append-inner="triggerSubmit"
			@keydown.enter="triggerSubmit"
			@update:model-value="triggerSubmit"
			@update:search="inputValue = $event"
		>
			<template #item="{ props, item }">
				<v-list-item v-bind="props">
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
		<button
			ref="submit"
			:aria-label="t('search')"
			:class="utils.hidden"
		></button>
	</v-form>
</template>

<script setup lang="ts">
	import useSearchHistoryStore from '@/stores/useSearchHistoryStore'
	import utils from '@/styles/utils.module.scss'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useFormSubmitHandler'
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	const inputValue = ref('')
	const history = useSearchHistoryStore()
	const triggerSubmit = useFormSubmit()
	const submitHandler = useFormSubmitHandler(inputValue)
</script>
