import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const app = initializeApp({
	apiKey: 'AIzaSyD7x_fdlGGohwSntmt0y7ldtRH7ZgP-Zuk',
	authDomain: 'momentum-reposteria.firebaseapp.com',
	projectId: 'momentum-reposteria',
	storageBucket: 'momentum-reposteria-media',
	messagingSenderId: '204474922833',
	appId: '1:204474922833:web:48fcbd5d7382ba62858570'
});

const auth = getAuth(app);
const db = getFirestore(app);

const menu = [
	{ id: 'inicio', label: 'Inicio', href: '/#cover', order: 0, location: 'main' },
	{ id: 'pasteles', label: 'Pasteles', href: '/#focus', order: 1, location: 'main' },
	{ id: 'brunch', label: 'Brunch & Coffee', href: '/#brunch-coffee', order: 2, location: 'main' },
	{ id: 'productos', label: 'Productos', href: '/#nuestros-productos', order: 3, location: 'main' },
	{ id: 'nosotros', label: 'Nosotros', href: '/#nosotros', order: 4, location: 'main' },
	{ id: 'contacto', label: 'Contacto', href: '/#contacto', order: 5, location: 'main' },
	{ id: 'tel', label: '81 1689 9697', href: 'tel:+528116899697', order: 0, location: 'top' },
	{ id: 'privacidad', label: 'Aviso de Privacidad', href: '/aviso-de-privacidad', order: 1, location: 'top' }
];

const ADMIN_EMAIL = process.env.SEED_EMAIL;
const ADMIN_PASS = process.env.SEED_PASS;
if (!ADMIN_EMAIL || !ADMIN_PASS) {
	console.error('Define SEED_EMAIL y SEED_PASS en el entorno.');
	process.exit(1);
}
await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);

const keep = new Set(menu.map((m) => m.id));
const existing = await getDocs(collection(db, 'menu'));
for (const d of existing.docs) {
	if (!keep.has(d.id)) {
		await deleteDoc(doc(db, 'menu', d.id));
		console.log('Eliminado:', d.id);
	}
}
for (const item of menu) {
	await setDoc(doc(db, 'menu', item.id), item);
}
console.log(`Menú actualizado: ${menu.length} enlaces.`);
process.exit(0);
