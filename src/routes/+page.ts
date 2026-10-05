import { loadPages, loadNews } from '$lib/content';

export async function load() {
	const [pages, news] = await Promise.all([loadPages(), loadNews()]);
	return { pages, news };
}
