<template>
	<v-app>
		<TopBanner :is-need-search-bar />
		<router-view />
	</v-app>
	<div
		class="i_bottomx current_theme d-flex flex-row-reverse justify-center ga-3 position-sticky bottom-0"
	></div>
</template>

<script lang="ts" setup>
	import { TOGGLE_SEARCHBAR } from './key'
	import useIsDarkTheme from './use/theme/useIsDarkTheme'

	const route = useRoute()
	const isNeedSearchBar = computed(() => !!route.meta?.isNeedSearchBar)

	const isShowSearchBar = ref(false)
	const toggleSearch = (isShow: boolean) => (isShowSearchBar.value = isShow)
	provide(TOGGLE_SEARCHBAR, { isShowSearchBar, toggleSearch })

	const isDark = useIsDarkTheme()
	const bgColor = computed(() => (isDark.value ? '#00000080' : '#ffffff80'))
</script>

<style lang="scss">
	.i_bottomx {
		background: v-bind(bgColor);
	}
</style>
