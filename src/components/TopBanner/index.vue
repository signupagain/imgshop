<template>
	<v-app-bar class="px-2">
		<template #prepend>
			<Logo />
		</template>
		<template #default>
			<div class="mx-sm-3 w-sm-50">
				<SearchBar v-if="mdAndUp && isShowSearchBar" />
			</div>
		</template>
		<template #append>
			<IconSection :is-show-search-bar />
		</template>
	</v-app-bar>
</template>

<script setup lang="ts" name="TopBanner">
	import { useDisplay } from 'vuetify'
	import { IS_SHOW_SEARCH_BTN } from './key'

	defineProps<{ isShowSearchBar?: boolean }>()

	const { mdAndUp } = useDisplay()
	const isBelowMdAndUp = computed(() => !mdAndUp.value)
	provide(IS_SHOW_SEARCH_BTN, isBelowMdAndUp)
</script>
