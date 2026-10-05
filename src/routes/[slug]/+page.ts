import { error } from '@sveltejs/kit';
import { loadPage } from '$lib/content';

export async function load({ params }) {
	const page = await loadPage(params.slug);
	if (!page || !page.published) {
		throw error(404, 'Página no encontrada');
	}
	return { page };
}
