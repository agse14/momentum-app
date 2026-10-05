import { error } from '@sveltejs/kit';
import { loadNewsItem } from '$lib/content';

export async function load({ params }) {
	const item = await loadNewsItem(params.slug);
	if (!item || !item.published) throw error(404, 'Noticia no encontrada');
	return { item };
}
