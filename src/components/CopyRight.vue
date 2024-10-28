<template>
	<v-footer class="d-flex justify-center">
		{{ new Date().getFullYear() }} —
		<strong v-text="t('title')"></strong>
	</v-footer>
</template>

<script setup lang="ts">
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation()
</script>

<style scoped></style>
