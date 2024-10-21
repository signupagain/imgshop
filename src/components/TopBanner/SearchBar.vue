<template>
	<v-form ref="form" @submit.prevent="submitHandler">
		<v-autocomplete
			v-model="inputValue"
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
			@keydown.enter="triggerSubmit"
			@update:model-value="triggerSubmit"
			@update:search="inputValue = $event"
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
	</v-form>
</template>

<script setup lang="ts">
	import useSearchHistoryStore from '@/stores/useSearchHistoryStore'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useFormSubmitHandler'
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	const inputValue = ref('')
	const history = useSearchHistoryStore()
	const triggerSubmit = useFormSubmit()
	const submitHandler = useFormSubmitHandler(inputValue)
</script>
