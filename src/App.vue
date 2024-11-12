<template>
	<v-app class="d-flex flex-column justify-space-between">
		<TopBanner />
		<RouterView />
		<CopyRight class="flex-0-1-0 elevation-2" />
	</v-app>
	<div
		class="i_bottomx current_theme d-flex flex-row-reverse justify-center ga-3 position-sticky bottom-0"
	></div>
</template>

<script lang="ts" setup>
	import useIsDarkTheme from './use/theme/useIsDarkTheme'

	const isDark = useIsDarkTheme()
	const bgColor = computed(() => (isDark.value ? '#00000080' : '#ffffff80'))
</script>

<style lang="scss">
	.i_bottomx {
		background: v-bind(bgColor);
	}
</style>
