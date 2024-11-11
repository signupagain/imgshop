<template>
	<div class="flex-1-1 position-relative">
		<v-card
			class="pa-3 elevation-5 text-center"
			:class="$style.card"
			max-width="500"
			tag="form"
			width="100%"
		>
			<v-card-title class="mb-3 font-bold">{{ t('title') }}</v-card-title>
			<v-card-text>
				<v-text-field
					autocomplete="username"
					:label="t('username')"
					name="username"
					required
				></v-text-field>
				<v-text-field
					autocomplete="current-password"
					:label="t('password')"
					name="password"
					required
					type="password"
				></v-text-field>
			</v-card-text>
			<v-card-actions class="mb-4">
				<v-spacer></v-spacer>
				<v-tooltip text="用戶系統尚未完成">
					<template #activator="{ props }">
						<v-btn v-bind="props" variant="tonal">{{ t('action') }}</v-btn>
					</template>
				</v-tooltip>
				<v-spacer></v-spacer>
			</v-card-actions>
			<a href="/" @click.prevent="router.push('/register')">
				{{ t('toRegister') }}
				<v-icon size="x-samll" style="vertical-align: 0">
					fas fa-arrow-right
				</v-icon>
			</a>
		</v-card>
		<theme-background></theme-background>
	</div>
</template>

<script setup lang="ts">
	import { useTranslation } from 'i18next-vue'

	const router = useRouter()
	const { t } = useTranslation('login')
</script>

<style lang="scss" module>
	@use '@/styles/mixin';

	.card {
		@include mixin.absolute;

		margin: auto;
		z-index: 1;
		height: fit-content;
	}
</style>
