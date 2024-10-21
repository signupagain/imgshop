<template>
	<a
		class="text-h6 d-flex align-center"
		href="/"
		:title="t('home')"
		@click.prevent
	>
		<img
			alt="the logo of ImgShop"
			:class="$style.logo"
			src="@/assets/logo.svg"
		/>
		<span :class="utils.brand" v-text="brandName"></span>
	</a>
</template>

<script setup lang="ts">
	import utils from '@/styles/utils.module.scss'
	import { useTranslation } from 'i18next-vue'

	const { t } = useTranslation('topbanner')
	const brandName = import.meta.env.VITE_BRAND_NAME
</script>

<style scoped lang="scss" module>
	.logo {
		width: 3rem;
		aspect-ratio: 1;
		filter: invert(1);

		:global(.v-theme--light) & {
			filter: invert(0);
		}
	}
</style>
