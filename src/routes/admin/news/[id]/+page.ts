import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { NewsItem } from '$lib/types';

export async function load({ params }) {
	if (params.id === 'new') return { item: null };
	const snap = await getDoc(doc(db, 'news', params.id));
	if (!snap.exists()) throw error(404, 'Noticia no encontrada');
	return { item: { id: snap.id, ...snap.data() } as NewsItem };
}
