<template>
	<template v-if="true">
		<v-btn
			href="/"
			v-bind="loginBind"
			tag="a"
			:text="t('login')"
			:title="t('login')"
			@click.prevent
		></v-btn>
		<v-btn
			v-if="mdAndUp"
			href="/"
			tag="a"
			:text="t('signup')"
			:title="t('signup')"
			variant="tonal"
			@click.prevent
		></v-btn>
	</template>
	<template v-else>
		<v-menu :location transition="slide-x-transition">
			<template #activator="{ props }">
				<v-btn
					icon="fas fa-bell"
					v-bind="props"
					:text="t('notification')"
					:title="t('notification')"
				></v-btn>
			</template>
			<notification-dialog />
		</v-menu>
		<v-menu
			:close-on-content-click="false"
			:location
			transition="slide-x-transition"
		>
			<template #activator="{ props }">
				<v-btn
					icon="fas fa-user"
					v-bind="props"
					:text="t('user')"
					:title="t('user')"
				></v-btn>
			</template>
			<navigation-dialog />
		</v-menu>
	</template>
</template>

<script setup lang="ts" name="UserSection">
	import { useTranslation } from 'i18next-vue'
	import { useDisplay } from 'vuetify'

	const { t } = useTranslation('topbanner')
	const { mdAndUp } = useDisplay()
	const loginBind = computed(() =>
		mdAndUp.value ? { variant: 'outlined' as const } : { icon: 'fas fa-user' }
	)
	const location = computed(() => (mdAndUp.value ? 'bottom end' : 'top center'))
</script>
