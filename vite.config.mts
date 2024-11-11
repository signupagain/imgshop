// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueRouter({
			dts: 'src/@types/typed-router.d.ts',
		}),
		Layouts(),
		AutoImport({
			imports: [
				'vue',
				{
					'vue-router/auto': ['useRoute', 'useRouter'],
				},
			],
			dts: 'src/@types/auto-imports.d.ts',
			eslintrc: {
				enabled: true,
			},
			vueTemplate: true,
		}),
		Components({
			dts: 'src/@types/components.d.ts',
		}),
		Vue({
			template: { transformAssetUrls },
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
		Vuetify({
			autoImport: true,
			styles: {
				configFile: 'src/styles/settings.scss',
			},
		}),
		Fonts({
			google: {
				families: [
					{
						name: 'Roboto',
						styles: 'wght@100;300;400;500;700;900',
					},
				],
			},
		}),
		VueDevTools(),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
	server: {
		port: 3000,
		proxy: {
			'/pexels': {
				target: 'https://api.pexels.com/v1/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/pexels/, ''),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[hash:base64:5]',
		},
	},
})
