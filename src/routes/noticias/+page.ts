import { loadNews } from '$lib/content';

export async function load() {
	const news = await loadNews();
	return { news };
}
