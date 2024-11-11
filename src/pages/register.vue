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
				></v-text-field>
				<v-text-field
					v-model:model-value="password"
					autocomplete="new-password"
					:label="t('password')"
					type="password"
				></v-text-field>
				<v-text-field
					autocomplete="new-password"
					:label="t('checkPassword')"
					:rules="[rules.theSame]"
					type="password"
				></v-text-field>
			</v-card-text>
			<v-card-actions class="mb-3">
				<v-spacer></v-spacer>
				<v-tooltip text="用戶系統尚未完成">
					<template #activator="{ props }">
						<v-btn v-bind="props" variant="tonal">{{ t('action') }}</v-btn>
					</template>
				</v-tooltip>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
		<theme-background></theme-background>
	</div>
</template>

<script setup lang="ts">
	import { useTranslation } from 'i18next-vue'

	interface Rules {
		theSame: (word: string) => true | string
	}

	const { t } = useTranslation('signup')

	const password = ref('')
	const rules: Rules = {
		theSame: v => v === password.value || t('error.theSame'),
	}
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
