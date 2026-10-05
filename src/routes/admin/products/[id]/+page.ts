import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { Product } from '$lib/types';

export async function load({ params }) {
	if (params.id === 'new') return { product: null };
	const snap = await getDoc(doc(db, 'products', params.id));
	if (!snap.exists()) throw error(404, 'Producto no encontrado');
	return { product: { id: snap.id, ...snap.data() } as Product };
}
