<template>
	<article class="flex-1-1-0 ma-5 d-flex flex-column ga-2">
		<h1 v-text="t('title')"></h1>
		<section class="flex-1-1-0 d-flex flex-column">
			<v-list
				class="d-flex ga-1 pa-0"
				density="compact"
				rounded="0"
				style="background: none"
			>
				<v-list-item
					v-for="theme of themes"
					:key="theme"
					class="d-inline-block pa-2 rounded-t"
					:class="[$style.label, { active: theme === listKey }]"
					:for="theme"
					tag="label"
					variant="tonal"
				>
					<input
						:id="theme"
						v-model="listKey"
						:class="utils.hidden"
						type="radio"
						:value="theme"
					/>
					{{ t('label', { returnObjects: true })[theme] }}
				</v-list-item>
			</v-list>
			<CartList v-model:list-key="listKey" class="flex-1-1-0 rounded-ts-0" />
		</section>
	</article>
</template>

<script setup lang="ts">
	import { useTranslation } from 'i18next-vue'
	import utils from '@/styles/utils.module.scss'
	import { FlattenArray } from '@/@types/utils'

	const themes = ['shoppingList', 'historyList'] as const

	export type ThemesUnionType = FlattenArray<typeof themes>

	const listKey = ref(themes[0])
	const { t } = useTranslation('cart')
</script>

<style lang="scss" module>
	.label {
		&:not(:global(.active)) {
			opacity: 0.5;
		}
	}
</style>
