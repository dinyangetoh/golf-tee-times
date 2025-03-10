import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
import adapter from "@sveltejs/adapter-node"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		postcss: true,
		preserve: ['ld+json', 'module'],
		typescript: true,
	}),

	kit: {
		adapter: adapter()

	}
};

export default config;
