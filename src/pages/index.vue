<template>
	<article
		ref="searchForm"
		class="text-center position-relative"
		:class="$style.x"
	>
		<div class="w-md-66 w-75" :class="$style.inner_x">
			<h1
				class="text-md-h1 text-sm-h2 text-h3"
				:class="utils.brand"
				v-text="t('title')"
			></h1>
			<search-bar></search-bar>
		</div>
		<theme-background></theme-background>
	</article>
</template>
<script lang="ts" setup>
	import { TOGGLE_SEARCHBAR, TOGGLE_SEARCHBAR_TYPE } from '@/key'
	import utils from '@/styles/utils.module.scss'
	import useThresholdToggleSearchBar from '@/use/useThresholdToggleSearchBar'
	import { useTranslation } from 'i18next-vue'

	definePage({
		meta: {
			isNeedSearchBar: true,
		},
	})

	const { t } = useTranslation()
	const searchForm = useTemplateRef('searchForm')
	const result = useThresholdToggleSearchBar(searchForm)
	const toggleSearchBar =
		inject<TOGGLE_SEARCHBAR_TYPE>(TOGGLE_SEARCHBAR)?.toggleSearch
	watch(result, val => {
		if (toggleSearchBar) toggleSearchBar(val)
	})
</script>
<style lang="scss" module>
	@use '@/styles/mixin';

	.x {
		height: calc(100dvh - 64px);
	}

	.inner_x {
		@include mixin.absolute();

		height: fit-content;
		z-index: 1;
		margin: 28dvh auto auto;

		& h1:first-of-type {
			margin-bottom: 3rem;
		}
	}
</style>
