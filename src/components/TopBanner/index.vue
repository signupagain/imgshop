<template>
	<v-app-bar class="px-2">
		<template #prepend>
			<Logo />
		</template>
		<template #default>
			<div class="mx-sm-3 w-sm-50">
				<SearchBar v-if="mdAndUp && isNeedSearchBar && isShowSearchBar" />
			</div>
		</template>
		<template #append>
			<IconSection :is-need-search-bar />
		</template>
	</v-app-bar>
</template>

<script setup lang="ts" name="TopBanner">
	import { useDisplay } from 'vuetify'
	import { TOGGLE_SEARCHBAR, TOGGLE_SEARCHBAR_TYPE } from '@/key'
	import { IS_NEED_SEARCH_BTN } from './key'

	defineProps<{ isNeedSearchBar?: boolean }>()

	const { mdAndUp } = useDisplay()
	const isBelowMdAndUp = computed(() => !mdAndUp.value)
	provide(IS_NEED_SEARCH_BTN, isBelowMdAndUp)
	const isShowSearchBar =
		inject<TOGGLE_SEARCHBAR_TYPE>(TOGGLE_SEARCHBAR)?.isShowSearchBar
</script>
