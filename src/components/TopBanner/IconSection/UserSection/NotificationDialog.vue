<template>
	<v-list>
		<v-list-subheader :title="t('notification')"></v-list-subheader>
		<template v-for="{ title, subtitle, id, icon } of messageList" :key="id">
			<v-divider class="mb-2"></v-divider>
			<v-list-item>
				<template #prepend><v-icon :icon></v-icon></template>
				<v-list-item-title>{{ title }}</v-list-item-title>
				<v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
			</v-list-item>
		</template>
	</v-list>
</template>

<script setup lang="ts" name="UserNotification">
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	// from useMessageStore
	const messageList = [
		{
			title: '注意',
			subtitle: '這是一段注意訊息。',
			id: '1',
			icon: 'fas fa-circle-exclamation',
		},
	]
</script>
