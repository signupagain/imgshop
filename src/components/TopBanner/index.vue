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
	import { isShow } from '@/use/feedback/useThresholdToggleSearchBar'
	import { RouteRecordName } from 'vue-router'
	import { useDisplay } from 'vuetify'

	const { mdAndUp } = useDisplay()
	const route = useRoute()

	const isShowSearchBar = computed(() => {
		if (route.name === '/') return mdAndUp.value && isShow.value

		const exception: Array<RouteRecordName> = [
			'/login',
			'/photo/[id]',
			'/register',
			'/[userID]/cart',
		]
		if (exception.includes(route.name)) return false

		return mdAndUp.value
	})
</script>
