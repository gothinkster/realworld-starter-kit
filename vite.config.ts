/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import solid from 'solid-start'
import devtoolsPlugin from 'solid-devtools/vite'

import type { UserConfig } from 'vitest/config'

const vitestConfig: UserConfig = {
	test: {
		globals: true,
		environment: 'jsdom',
		transformMode: {
			web: [/\.[tj]sx?$/]
		},
		setupFiles: './scripts/setup-vitest.ts',
		// solid needs to be inline to work around
		// a resolution issue in vitest:
		deps: {
			inline: [/solid-js/]
		}
		// if you have few tests, try commenting one
		// or both out to improve performance:
		// threads: false,
		// isolate: false,
	}
}

const viteConfig = defineConfig({
	test: vitestConfig.test,
	plugins: [
		devtoolsPlugin(),
		solid({
			ssr: true
		})
	],
	build: {
		target: 'esnext',
		polyfillModulePreload: false
		// polyfillDynamicImport: false
	},
	resolve: {
		conditions: ['development', 'browser']
	}
}) as UserConfig

export default viteConfig
