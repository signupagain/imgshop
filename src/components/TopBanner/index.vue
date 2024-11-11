<template>
	<v-app-bar class="px-2">
		<template #prepend>
			<Logo />
		</template>
		<template #default>
			<div class="mx-sm-3 w-sm-50">
				<SearchBar v-if="isShowSearchBar" />
			</div>
		</template>
		<template #append>
			<IconSection />
		</template>
	</v-app-bar>
</template>

<script setup lang="ts" name="TopBanner">
	import { TOGGLE_SEARCHBAR, TOGGLE_SEARCHBAR_TYPE } from '@/key'
	import { useDisplay } from 'vuetify'

	const { mdAndUp } = useDisplay()
	const { isIntersecting } = inject<TOGGLE_SEARCHBAR_TYPE>(TOGGLE_SEARCHBAR)!
	const route = useRoute()
	const isShowSearchBar = computed(() => {
		if (route.name === '/') return mdAndUp.value && isIntersecting.value

		const exception = ['/cart', '/login', '/register']
		if (exception.includes(route.name)) return false

		return mdAndUp.value
	})
</script>
