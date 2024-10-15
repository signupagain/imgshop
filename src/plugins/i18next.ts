import i18next, { InitOptions } from 'i18next'
import { App } from 'vue'
import I18NextVue from 'i18next-vue'
import zhHantTW from '@/locale/output/zhHantTW'

const i18nOption: InitOptions = {
	debug: import.meta.env.MODE === 'development',
	lng: import.meta.env.VITE_DEFAULT_LNG ?? 'zh-Hant-TW',
	interpolation: {
		escapeValue: false,
	},
	fallbackLng: false,
	resources: {
		'zh-Hant-TW': zhHantTW,
	},
}

i18next.init(i18nOption)

export default function (app: App) {
	app.use(I18NextVue, { i18next })
	return app
}
