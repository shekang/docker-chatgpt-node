import { defineConfig } from 'astro/config'
// import vercel from '@astrojs/vercel/edge'
import unocss from 'unocss/astro'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import solidJs from '@astrojs/solid-js'
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	integrations: [
		unocss({
			presets: [presetAttributify(), presetUno(), presetTypography()],
		}),
		solidJs(),
	],
	output: "server",
	server: {
		host: '0.0.0.0',
		port: 3678
	},
	adapter: node({
		mode: "standalone",
	}),
});