import { error } from '@sveltejs/kit';
import { loadPage } from '$lib/content';

export async function load({ params }) {
	if (params.slug === 'new') return { page: null };
	const page = await loadPage(params.slug);
	if (!page) throw error(404, 'Página no encontrada');
	return { page };
}
