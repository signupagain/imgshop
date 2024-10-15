<template>
	<v-form ref="form" @submit.prevent="submitHandler">
		<v-autocomplete
			v-model="inputValue"
			append-inner-icon="fas fa-magnifying-glass"
			close-text="Search"
			density="compact"
			hide-details
			hide-no-data
			:items="showList"
			menu-icon=""
			name="search"
			placeholder="PLACEHOLDER"
			single-line
			variant="outlined"
			@click:append-inner="triggerSubmit"
			@keydown.enter="triggerSubmit"
			@update:model-value="triggerSubmit"
		>
			<template #item="{ props, item }">
				<v-list-item v-bind="props">
					<template #append>
						<v-btn
							icon="fas fa-circle-xmark"
							@click.stop="deleteHistory(item.value)"
							@keydown.stop.enter="deleteHistory(item.value)"
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
	import utils from '@/styles/utils.module.scss'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useFormSubmitHandler'
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	// from useHistoryStore
	const historyList = reactive(['abc', 'def', 'ghi'])
	const deleteHistory = (str: string) => console.log('delete ' + str)

	const inputValue = ref('')
	const showList = computed(() =>
		historyList.filter(s => s !== inputValue.value)
	)

	const triggerSubmit = useFormSubmit()
	const submitHandler = useFormSubmitHandler(inputValue)
</script>
