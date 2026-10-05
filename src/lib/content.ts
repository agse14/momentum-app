import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { Site, Page, MenuItem, Product, NewsItem } from '$lib/types';

export async function loadSite(): Promise<Site | null> {
	const snap = await getDoc(doc(db, 'site', 'main'));
	return snap.exists() ? ({ ...snap.data() } as Site) : null;
}

export async function loadMenu(): Promise<MenuItem[]> {
	const snap = await getDocs(collection(db, 'menu'));
	return snap.docs
		.map((d) => ({ id: d.id, ...d.data() }) as MenuItem)
		.sort((a, b) => a.order - b.order);
}

export async function loadPages(): Promise<Page[]> {
	const snap = await getDocs(collection(db, 'pages'));
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Page).sort((a, b) => a.order - b.order);
}

export async function loadPage(id: string): Promise<Page | null> {
	const snap = await getDoc(doc(db, 'pages', id));
	return snap.exists() ? ({ id: snap.id, ...snap.data() } as Page) : null;
}

export async function loadProducts(): Promise<Product[]> {
	const snap = await getDocs(query(collection(db, 'products'), orderBy('order')));
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
}

export async function loadNews(): Promise<NewsItem[]> {
	const snap = await getDocs(collection(db, 'news'));
	return snap.docs
		.map((d) => ({ id: d.id, ...d.data() }) as NewsItem)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function loadNewsItem(id: string): Promise<NewsItem | null> {
	const snap = await getDoc(doc(db, 'news', id));
	return snap.exists() ? ({ id: snap.id, ...snap.data() } as NewsItem) : null;
}
