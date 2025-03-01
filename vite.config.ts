import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	plugins: [
		vue(),
		vueJsx(),
		nightwatchPlugin(),
	],
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		}
	}
})
