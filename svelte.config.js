import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// En Vercel se usa adapter-vercel; en local (y para Firebase Hosting) adapter-static.
const isVercel = !!process.env.VERCEL;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: isVercel ? adapterVercel() : adapterStatic({ fallback: 'index.html' })
	}
};

export default config;
