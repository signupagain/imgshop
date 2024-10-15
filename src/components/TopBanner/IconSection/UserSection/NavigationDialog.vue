<template>
	<v-list @click.prevent="eventHandler">
		<v-list-item
			prepend-icon="fas fa-user"
			:subtitle="userInfo.id"
			tag="p"
			:title="userInfo.name"
			variant="text"
		></v-list-item>
		<v-divider class="my-3"></v-divider>
		<v-list-item
			v-for="({ icon, title, fn, routeName }, key) of userItems"
			:key
			class="w-100"
			:prepend-icon="icon"
			tag="button"
			@click.prevent
		>
			<v-list-item-title :data-fn="fn" :data-name="routeName">
				{{ title }}
			</v-list-item-title>
		</v-list-item>
	</v-list>
</template>

<script setup lang="ts" name="UserNavigation">
	import { useTranslation } from 'i18next-vue'
	import { useTheme } from 'vuetify'
	import { IS_SHOW_COLORMODE_BTN, IS_SHOW_COLORMODE_BTN_TYPE } from '../key'
	import useChangeTheme from '@/use/theme/useChangeTheme'
	import useSetThemeIcon from '@/use/theme/useSetThemeIcon'

	const { t } = useTranslation('topbanner')
	// const router = useRouter()
	const isShowColorModeBtn = inject<IS_SHOW_COLORMODE_BTN_TYPE>(
		IS_SHOW_COLORMODE_BTN
	)

	const theme = useTheme()
	const themeTitle = computed(() =>
		t(`userDialog.${theme.name.value as 'dark' | 'light'}`)
	)
	const themeIcon = useSetThemeIcon()
	const changeTheme = useChangeTheme()

	// from useUserStore
	const userInfo = {
		name: '遊客',
		id: 'nanoId',
	}

	type UserSelection = {
		title: string
		icon: string
		fn: string
		routeName?: string
		isFilled?: boolean
	}

	const items = reactive<Array<UserSelection>>([
		{
			title: t('userDialog.list'),
			icon: 'fas fa-list',
			fn: 'to',
			routeName: 'list',
		},
		{
			title: t('userDialog.cart'),
			icon: 'fas fa-cart-shopping',
			fn: 'to',
			routeName: 'cart',
		},
		{
			title: t('userDialog.data'),
			icon: 'fas fa-gear',
			fn: 'to',
			routeName: 'settings',
		},
		{
			isFilled: true,
			title: t('userDialog.logout'),
			icon: 'fas fa-right-from-bracket',
			fn: 'logout',
		},
	])

	const userItems = computed(() =>
		isShowColorModeBtn?.value ? items : (
			items.concat({
				isFilled: true,
				title: themeTitle.value,
				icon: themeIcon.value,
				fn: 'changeTheme',
			})
		)
	)

	function eventHandler(e: Event) {
		if (e.target instanceof HTMLElement && e.target.dataset) {
			const target = e.target
			const { fn, routeName: name } = target.dataset

			switch (fn) {
				case 'to':
					// if (name) router.push({ name })
					console.log('routerPush')
					break
				case 'logout':
					console.log('logout')
					break
				case 'changeTheme':
					changeTheme()
					break
			}
		}
	}
</script>

<style scoped></style>
