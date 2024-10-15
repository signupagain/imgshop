declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_DEFAULT_LNG: string
	readonly VITE_DEFAULT_COLOR_MODE: string
	readonly VITE_BRAND_NAME: string
	readonly VITE_PEXELS_API_AUTH_KEY: string
	readonly VITE_DEFAULT_NANOID_LENGTH: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
