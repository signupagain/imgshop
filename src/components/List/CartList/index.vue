<template>
	<v-card class="d-flex flex-column" flat variant="tonal">
		<v-card-title class="d-flex align-center">
			<v-text-field
				v-if="!mdAndDown"
				v-model:model-value="search"
				:class="$style.search"
				density="compact"
				hide-details
				placeholder="Search"
				variant="outlined"
			>
				<template #prepend-inner>
					<v-icon size="small">fas fa-magnifying-glass</v-icon>
				</template>
			</v-text-field>
			<v-divider v-if="!mdAndDown" class="mx-2" inset vertical></v-divider>
			<span v-text="t('wallet', { money: userStore.money })"></span>
			<v-spacer></v-spacer>
			<template v-if="isShoppingList">
				<template v-if="allSelected || someSelected">
					<v-btn
						icon="fas fa-trash-can"
						size="small"
						variant="flat"
						@click="deleteSelectedItems"
					></v-btn>
					<v-divider class="mx-2" inset vertical></v-divider>
				</template>
				<v-tooltip
					:disabled="!isBtndisabled"
					location="top"
					:model-value="isBtndisabled"
				>
					<template #activator="{ props }">
						<v-btn
							v-bind="props"
							:disabled="isBtndisabled"
							variant="tonal"
							@click="purchaseHandler"
						>
							{{ t('purchase') }}
						</v-btn>
					</template>
					{{ tooltip }}
					<div :class="$style.tip"></div>
				</v-tooltip>
			</template>
			<v-dialog v-if="isNeedDialog" v-model="dialog" max-width="400">
				<v-card>
					<v-card-title>{{ t('dialog.title') }}</v-card-title>
					<v-card-text>{{ t('dialog.text') }}</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="stopDialog">{{ t('dialog.stop') }}</v-btn>
						<v-btn @click="dialog = false">{{ t('dialog.close') }}</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-title>
		<v-data-table
			:class="$style.cart_table"
			density="compact"
			:headers
			:item-value="item => `${item.id}`"
			:items
			:items-per-page="-1"
			:no-data-text
			:search
			select-strategy="all"
			:show-select="isShoppingList"
			sticky
		>
			<template v-if="isShoppingList" #header.data-table-select>
				<v-checkbox-btn
					:indeterminate="!allSelected && someSelected"
					:model-value="allSelected"
					@update:model-value="selectAll(!allSelected)"
				></v-checkbox-btn>
			</template>
			<template #item="{ item }">
				<tr>
					<td v-text="item.title"></td>
					<td v-text="item.photographer"></td>
					<td class="text-center">
						<img
							:alt="item.title"
							:class="$style.img"
							loading="lazy"
							:src="item.src"
						/>
					</td>
					<td class="text-end" v-text="item.price"></td>
					<td v-if="isShoppingList">
						<v-checkbox-btn
							v-model="currentSelectedItems"
							:value="item"
						></v-checkbox-btn>
					</td>
				</tr>
			</template>
			<template #bottom></template>
		</v-data-table>
	</v-card>
</template>

<script setup lang="ts">
	import { VDataTableHeaderArray } from '@/@types/vuetify'
	import { useTranslation } from 'i18next-vue'
	import useCartListItems from './useCartListItems'
	import { ThemesUnionType } from '@/pages/[userID]/cart.vue'
	import useCartDialog from './useCartDialog'
	import useUserStore from '@/stores/useUserStore'
	import { useDisplay } from 'vuetify'

	const listKey = defineModel<ThemesUnionType>('listKey', {
		required: true,
	})
	const isShoppingList = computed(() => listKey.value === 'shoppingList')

	const { mdAndDown } = useDisplay()
	const userStore = useUserStore()

	const { dialog, isNeedDialog, purchaseHandler, stopDialog } =
		useCartDialog(listKey)

	const {
		items,
		tooltip,
		allSelected,
		someSelected,
		currentSelectedItems,
		selectAll,
		deleteSelectedItems,
	} = useCartListItems(listKey)

	const search = ref('')
	const isBtndisabled = computed(() => !!tooltip.value)

	const { t } = useTranslation('cart')
	const noDataText = computed(() =>
		listKey.value === 'shoppingList' ? t('noData') : t('noHistory')
	)

	const headers = computed(() => {
		const fixedPart: VDataTableHeaderArray = [
			{ title: t('table.title'), key: 'title' },
			{ title: t('table.photographer'), key: 'photographer' },
			{ title: t('table.photo'), key: 'src', sortable: false, align: 'center' },
			{ title: t('table.price'), key: 'price', align: 'end' },
			{ key: 'data-table-select' },
		]

		return isShoppingList.value ? fixedPart : fixedPart.slice(0, -1)
	})
</script>

<style lang="scss" module>
	@use '@/styles/mixin';

	.search {
		flex: 0 45%;
	}

	.tip {
		text-align: center;
		position: relative;

		&::after {
			@include mixin.absolute;

			content: '';
			width: 0;
			margin: auto;
			margin-top: 0.1rem;
			border-width: 0.6rem 0.5rem;
			border-style: solid;
			border-color: rgb(var(--v-theme-surface-variant)) transparent transparent;
		}
	}

	.cart_table {
		flex: 1;
		overflow: auto;

		:global(.v-table__wrapper) {
			flex: 1;
		}

		:global(.v-selection-control) {
			justify-content: center;
		}
	}

	.img {
		height: 50px;
		vertical-align: top;
	}
</style>
