<template>
	<v-dialog v-if="isShowSearchBtn" max-height="600" max-width="500">
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
							v-model="inputValue"
							hide-details
							variant="outlined"
							@keydown.enter="triggerSubmit"
						>
							<template #prepend-inner>
								<v-icon icon="fas fa-magnifying-glass" size="small"></v-icon>
							</template>
						</v-text-field>
						<button ref="submit" :class="utils.hidden"></button>
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
							@click="listClick(title)"
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
	import { IS_SHOW_SEARCH_BTN } from '../TopBanner/key'
	import useFormSubmit from '@/use/form/useFormSubmit'
	import useFormSubmitHandler from '@/use/form/useFormSubmitHandler'
	import useSearchHistoryStore from '@/stores/useSearchHistoryStore'

	const { t } = useTranslation('topbanner')
	const { smAndUp } = useDisplay()
	const isShowSearchBtn = inject<boolean>(IS_SHOW_SEARCH_BTN)

	const inputValue = ref('')
	const history = useSearchHistoryStore()
	const showList = computed(() =>
		history.outputList.filter(({ word }) => word !== inputValue.value)
	)

	const deleteSingleHistory = history.deleteSingleHistory
	const triggerSubmit = useFormSubmit()
	const submitHandler = useFormSubmitHandler(inputValue)

	function listClick(value: string) {
		inputValue.value = value
		triggerSubmit()
	}
</script>

<style scoped></style>
