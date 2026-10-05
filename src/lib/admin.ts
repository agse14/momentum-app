import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '$lib/firebase';

function clean<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export async function saveDoc(col: string, id: string, data: Record<string, unknown>): Promise<void> {
	await setDoc(doc(db, col, id), clean(data), { merge: true });
}

export async function removeDoc(col: string, id: string): Promise<void> {
	await deleteDoc(doc(db, col, id));
}

export async function listCol<T>(col: string, orderField?: string): Promise<T[]> {
	const snap = await getDocs(
		orderField ? query(collection(db, col), orderBy(orderField)) : collection(db, col)
	);
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function uploadImage(file: File, folder = 'site'): Promise<string> {
	const safe = file.name.replace(/[^\w.-]+/g, '_');
	const path = `${folder}/${Date.now()}-${safe}`;
	const r = ref(storage, path);
	await uploadBytes(r, file);
	return await getDownloadURL(r);
}

export function slugify(text: string): string {
	return text
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
