<template>
	<div class="d-flex align-center ga-2">
		<Teleport defer :disabled="smAndUp" to=".i_bottomx">
			<SearchDialog></SearchDialog>
			<UserSection />
			<v-btn
				href="/"
				icon="fas fa-bag-shopping"
				tag="a"
				:text="t('cart')"
				:title="t('cart')"
				@click.prevent
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

	const { t } = useTranslation('topbanner')
	const { smAndUp } = useDisplay()
	const isShowColorModeBtn = computed(() => !smAndUp.value)
	const icon = setThemeIcon()
	const changeTheme = useChangeTheme()

	useDetectSystemColorScheme()

	provide(IS_SHOW_COLORMODE_BTN, isShowColorModeBtn)
</script>
