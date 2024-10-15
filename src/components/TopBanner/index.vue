<template>
	<v-app-bar class="px-2">
		<template #prepend>
			<Logo />
		</template>
		<template #default>
			<div class="mx-sm-3 w-sm-50">
				<SearchBar v-if="mdAndUp" />
			</div>
		</template>
		<template #append>
			<IconSection />
		</template>
	</v-app-bar>
</template>

<script setup lang="ts" name="TopBanner">
	import { useDisplay } from 'vuetify'
	import { IS_SHOW_SEARCH_BTN } from './key'

	const { mdAndUp } = useDisplay()
	const isBelowMdAndUp = computed(() => !mdAndUp.value)
	provide(IS_SHOW_SEARCH_BTN, isBelowMdAndUp)
</script>
