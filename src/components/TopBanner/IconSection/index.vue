<template>
	<div
		class="d-flex align-center ga-2"
		:class="{ [$style['icon-section']]: isDetailPage && !smAndUp }"
	>
		<Teleport defer :disabled="smAndUp || isDetailPage" to=".i_bottomx">
			<SearchDialog></SearchDialog>
			<UserSection />
			<v-btn
				href="/"
				icon="fas fa-bag-shopping"
				tag="a"
				:text="t('cart')"
				:title="t('cart')"
				@click.prevent="toCartPage"
			></v-btn>
			<template v-if="smAndUp">
				<v-divider inset vertical></v-divider>
				<v-btn
					:icon
					:text="t('toggleMode')"
					:title="t('toggleMode')"
					@click="changeTheme"
				></v-btn>
			</template>
		</Teleport>
	</div>
</template>

<script setup lang="ts" name="IconSection">
	import { useDisplay } from 'vuetify'
	import setThemeIcon from '@/use/theme/useSetThemeIcon'
	import { useTranslation } from 'i18next-vue'
	import useChangeTheme from '@/use/theme/useChangeTheme'
	import useDetectSystemColorScheme from '@/use/theme/useDetectSystemColorScheme'
	import { IS_SHOW_COLORMODE_BTN } from './key'
	import useToCartPage from './useToCartPage'

	const { t } = useTranslation('topbanner')
	const { smAndUp } = useDisplay()
	const isShowColorModeBtn = computed(() => !smAndUp.value)
	const icon = setThemeIcon()
	const changeTheme = useChangeTheme()
	const toCartPage = useToCartPage()

	const route = useRoute()
	const isDetailPage = computed(() => route.name === '/photo/[id]')

	useDetectSystemColorScheme()

	provide(IS_SHOW_COLORMODE_BTN, isShowColorModeBtn)
</script>

<style lang="scss" module>
	.icon-section {
		html:has(&) {
			overflow: hidden;
		}
	}
</style>
