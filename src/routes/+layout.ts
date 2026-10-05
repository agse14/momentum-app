import { loadSite, loadMenu } from '$lib/content';

export const ssr = false;
export const prerender = false;

export async function load() {
	const [site, menu] = await Promise.all([loadSite(), loadMenu()]);
	return { site, menu };
}
