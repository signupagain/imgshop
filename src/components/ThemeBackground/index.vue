<template>
	<figure :class="$style.figure">
		<img :class="$style.img" v-bind="themeBg" />
		<p :class="$style.p">
			{{ t('by') }}
			<a
				class="d-inline-flex align-center ga-1"
				:href="themeBg['data-author-link']"
				target="_blank"
			>
				{{ themeBg['data-author'] }}
				<v-icon icon="fas fa-arrow-up-right-from-square" size="12"></v-icon>
			</a>
		</p>
	</figure>
</template>

<script setup lang="ts">
	import { useTranslation } from 'i18next-vue'
	import useIsDarkTheme from '@/use/theme/useIsDarkTheme'
	import { darkBgBind, lightBgBind } from './binds'

	const { t } = useTranslation()
	const isDark = useIsDarkTheme()
	const themeBg = computed(() => (isDark.value ? darkBgBind : lightBgBind))
</script>

<style lang="scss" module>
	@use '@/styles/mixin';

	.figure {
		@include mixin.absolute();
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.p {
		@include mixin.absolute(false);
		$offset: 2rem;

		right: $offset;
		bottom: $offset;
		font-weight: 900;

		@media (max-width: 450px) {
			inset: auto 0 3rem;
			width: fit-content;
			margin: auto;
		}
	}
</style>
