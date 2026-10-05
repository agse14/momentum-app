import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD7x_fdlGGohwSntmt0y7ldtRH7ZgP-Zuk',
	authDomain: 'momentum-reposteria.firebaseapp.com',
	projectId: 'momentum-reposteria',
	storageBucket: 'momentum-reposteria-media',
	messagingSenderId: '204474922833',
	appId: '1:204474922833:web:48fcbd5d7382ba62858570'
};

const ADMIN_EMAIL = process.env.SEED_EMAIL;
const ADMIN_PASS = process.env.SEED_PASS;
if (!ADMIN_EMAIL || !ADMIN_PASS) {
	console.error('Define SEED_EMAIL y SEED_PASS en el entorno.');
	process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const M = (id, path) => ({ id, path: '/uploads/' + path });

const media = {
	44: '2023/05/cakes.jpg',
	57: '2023/05/pastel.jpg',
	68: '2023/07/pastel3.jpg',
	42: '2023/05/cake-fresa.jpg',
	43: '2023/05/cake-menta.jpg',
	56: '2023/05/paste-naranja.jpg',
	66: '2023/07/passtel2.jpg',
	67: '2023/07/pastel.jpg',
	50: '2023/05/cupcakes.jpeg',
	47: '2023/05/cupcake-chocolate.jpg',
	49: '2023/05/cupcake-menta.jpg',
	48: '2023/05/cupcake-menta-1.jpg',
	64: '2023/07/galletas.jpg',
	65: '2023/07/galletas2.jpg',
	73: '2023/08/pilar.jpg',
	74: '2023/09/lafon.jpg',
	75: '2023/09/maplin.jpg',
	76: '2023/09/saip.jpg',
	80: '2023/10/sofia.jpg',
	79: '2023/10/losolivos.jpg',
	78: '2023/10/ciudad24.jpg',
	55: '2023/05/menu.jpg',
	45: '2023/05/cartel1.jpg',
	62: '2023/07/brwonies.jpg',
	63: '2023/07/cheese-cake.jpg',
	70: '2023/07/rosca.jpg',
	82: '2024/05/madre.jpg',
	81: '2024/05/dia-nino.jpg',
	58: '2023/05/personal.jpg',
	59: '2023/05/vidriera1.jpg',
	54: '2023/05/logo-momentum-blanco.png',
	53: '2023/05/home.jpg'
};

const img = (id) => (media[id] ? '/uploads/' + media[id] : '');
const imgs = (ids) => ids.map((i) => media[i]).filter(Boolean).map((p) => '/uploads/' + p);

const site = {
	name: 'Momentum Repostería',
	slogan: 'Brunch & Coffee',
	description: 'Repostería artesanal, brunch & coffee',
	phone: '81 1689 9697',
	phoneHref: 'tel:+528116899697',
	whatsapp: '+52 81 1689 9697',
	whatsappUrl:
		'https://wa.me/528116899697?text=Hola!%20Estaba%20visitando%20el%20sitio%20web%20y%20necesitaba%20más%20información',
	address: 'Monterrey, Nuevo León',
	mapsUrl: '',
	email: '',
	facebook: 'https://www.facebook.com/PostresPilarCarballo',
	instagram: 'https://www.instagram.com/momentumbypilarcarballo/',
	analyticsId: 'G-3JG8XTG3CQ',
	brandColor: '#6d8a74',
	logo: '/img/logo-momentum-blanco.png',
	coverImage: img(53),
	coverTitle: 'Momentum',
	coverSubtitle: 'Brunch & Coffee',
	coverButtonLabel: 'Nuestros Productos',
	coverButtonLink: '/nuestros-productos',
	footerCredit: 'WD5 Soluciones Web',
	footerCreditUrl: 'http://www.wd5.com.ar/',
	newsTitle: 'Novedades',
	newsSubtitle: 'Nuestras últimas creaciones'
};

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

const pages = [
	{
		id: 'pasteles',
		title: 'Pasteles',
		order: 1,
		template: 'focus',
		excerpt:
			'Pasteles artesanales elaborados con ingredientes de la mejor calidad, perfectos para cualquier ocasión especial.',
		content:
			'<p>Pasteles artesanales elaborados con ingredientes de la mejor calidad, perfectos para cualquier ocasión especial.</p>\n<p>¿Buscas un pastel para un evento o simplemente un antojo? Escríbenos por WhatsApp y lo hacemos realidad.</p>',
		image: img(44),
		gallery: [44, 57, 68, 42, 43, 56, 66, 67],
		showOnHome: true,
		published: true
	},
	{
		id: 'cupcakes-y-galletas',
		title: 'Cupcakes y Galletas',
		order: 2,
		template: 'focus',
		excerpt: 'Cupcakes y galletas decoradas a mano. Ideales para fiestas, eventos y antojos de todos los días.',
		content:
			'<p>Cupcakes y galletas decoradas a mano. Ideales para fiestas, eventos y antojos de todos los días.</p>\n<p>Pide los tuyos por WhatsApp.</p>',
		image: img(50),
		gallery: [50, 47, 49, 48, 64, 65],
		showOnHome: true,
		published: true
	},
	{
		id: 'reposteria-personalizada',
		title: 'Repostería Personalizada',
		order: 3,
		template: 'focus',
		excerpt:
			'Creamos el pastel perfecto para tus celebraciones. Cada pieza es única, hecha a mano.',
		content:
			'<p>Repostería personalizada: creamos el pastel perfecto para tus celebraciones. Cada pieza es única, hecha a mano.</p>\n<p>Cuéntanos tu idea y la convertimos en un pastel. Contáctanos.</p>',
		image: img(57),
		gallery: [73, 74, 75, 76, 80, 79, 78],
		showOnHome: true,
		published: true
	},
	{
		id: 'brunch-coffee',
		title: 'Brunch & Coffee',
		order: 4,
		template: 'parallax',
		excerpt: 'Disfruta de nuestro delicioso brunch acompañado de pan artesanal, postres de la casa y el mejor café.',
		content:
			'<p>Disfruta de nuestro delicioso brunch acompañado de pan artesanal, postres de la casa y el mejor café.</p>\n<p>Visítanos en Monterrey y conoce nuestro menú completo.</p>',
		image: img(45),
		gallery: [55, 45],
		showOnHome: true,
		published: true
	},
	{
		id: 'nuestros-productos',
		title: 'Nuestros Productos',
		order: 5,
		template: 'panel-right',
		excerpt:
			'Pasteles, cheesecakes, cupcakes, galletas, brownies y roscas. Todo elaborado artesanalmente.',
		content:
			'<p>Contamos con una gran variedad de productos: pasteles, cheesecakes, cupcakes, galletas, brownies y roscas. Todo elaborado artesanalmente.</p>\n<p>Haz tu pedido por WhatsApp o síguenos en Instagram.</p>',
		image: img(42),
		gallery: [
			44, 57, 68, 42, 43, 56, 66, 67, 50, 47, 49, 48, 64, 65, 62, 63, 70, 73, 74, 75, 76, 80, 79, 78, 82, 81
		],
		showOnHome: false,
		published: true
	},
	{
		id: 'nosotros',
		title: 'Nosotros',
		order: 6,
		template: 'panel-left',
		excerpt: 'Momentum es un proyecto de repostería artesanal a cargo de Pilar Carballo.',
		content:
			'<p>Momentum es un proyecto de repostería artesanal a cargo de Pilar Carballo. Cada pieza se elabora con pasión y dedicación para endulzar tus momentos especiales.</p>',
		image: img(58),
		gallery: [],
		showOnHome: false,
		published: true
	},
	{
		id: 'contacto',
		title: 'Contacto',
		order: 7,
		template: 'panel-center',
		excerpt: 'Escríbenos por WhatsApp o contáctanos por redes sociales.',
		content:
			'<p>¿Tienes un antojo o un pedido especial? Escríbenos por WhatsApp o contáctanos por redes sociales.</p>\n<p><strong>WhatsApp:</strong> <a href="https://wa.me/528116899697" target="_blank">81 1689 9697</a><br>\n<strong>Facebook:</strong> <a href="https://www.facebook.com/PostresPilarCarballo" target="_blank">Postres Pilar Carballo</a><br>\n<strong>Instagram:</strong> <a href="https://www.instagram.com/momentumbypilarcarballo/" target="_blank">@momentumbypilarcarballo</a></p>',
		image: img(59),
		gallery: [],
		showOnHome: false,
		published: true
	},
	{
		id: 'aviso-de-privacidad',
		title: 'Aviso de Privacidad',
		order: 8,
		template: 'default',
		excerpt: 'Aviso de privacidad de Momentum Repostería.',
		content:
			'<p>En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, le informamos la manera en que recabamos, utilizamos y protegemos sus datos personales.</p>',
		image: '',
		gallery: [],
		showOnHome: false,
		published: true
	}
].map((p) => ({ ...p, gallery: imgs(p.gallery) }));

const products = [
	{ id: 'cake-fresa', name: 'Cake Fresa', category: 'Pasteles', image: img(42), order: 1 },
	{ id: 'cake-menta', name: 'Cake Menta', category: 'Pasteles', image: img(43), order: 2 },
	{ id: 'paste-naranja', name: 'Paste Naranja', category: 'Pasteles', image: img(56), order: 3 },
	{ id: 'pastel', name: 'Pastel Artesanal', category: 'Pasteles', image: img(57), order: 4 },
	{ id: 'pastel3', name: 'Pastel Decorado', category: 'Pasteles', image: img(68), order: 5 },
	{ id: 'cupcake-chocolate', name: 'Cupcake Chocolate', category: 'Cupcakes', image: img(47), order: 6 },
	{ id: 'cupcake-menta', name: 'Cupcake Menta', category: 'Cupcakes', image: img(49), order: 7 },
	{ id: 'cupcakes', name: 'Cupcakes Surtidos', category: 'Cupcakes', image: img(50), order: 8 },
	{ id: 'galletas', name: 'Galletas Decoradas', category: 'Galletas', image: img(64), order: 9 },
	{ id: 'galletas2', name: 'Galletas Surtidas', category: 'Galletas', image: img(65), order: 10 },
	{ id: 'brownies', name: 'Brownies', category: 'Postres', image: img(62), order: 11 },
	{ id: 'cheesecake', name: 'Cheese Cake', category: 'Postres', image: img(63), order: 12 },
	{ id: 'rosca', name: 'Rosca Artesanal', category: 'Postres', image: img(70), order: 13 },
	{ id: 'personalizado', name: 'Pastel Personalizado', category: 'Personalizados', image: img(73), order: 14 }
].map((p) => ({ ...p, description: '', active: true }));

const news = [
	{
		id: 'pastel-dia-de-las-madres',
		title: 'Pastel del Día de las Madres',
		date: '2024-05-10',
		excerpt:
			'Celebra a mamá con nuestro delicioso pastel especial del Día de las Madres, decorado con flores y su toque favorito.',
		content:
			'<p>Celebra a mamá con nuestro delicioso pastel especial del Día de las Madres, decorado con flores y su toque favorito.</p>',
		image: img(82),
		published: true
	},
	{
		id: 'pasteles-dia-del-nino',
		title: 'Pasteles para el Día del Niño',
		date: '2024-04-20',
		excerpt: 'Pasteles divertidos y coloridos para consentir a los pequeños en su gran día.',
		content: '<p>Pasteles divertidos y coloridos para consentir a los pequeños en su gran día.</p>',
		image: img(81),
		published: true
	},
	{
		id: 'nuestra-rosca-artesanal',
		title: 'Nuestra Rosca Artesanal',
		date: '2024-01-05',
		excerpt: 'Nuestra tradicional rosca artesanal, perfecta para compartir en familia.',
		content: '<p>Nuestra tradicional rosca artesanal, perfecta para compartir en familia.</p>',
		image: img(70),
		published: true
	}
];

async function seed() {
	const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
	const token = await cred.user.getIdTokenResult(true);
	console.log('Sesión:', cred.user.email, '| admin =', token.claims.admin === true);

	const batch = writeBatch(db);
	batch.set(doc(db, 'site', 'main'), site);
	for (const item of menu) batch.set(doc(db, 'menu', item.id), item);
	for (const p of pages) batch.set(doc(db, 'pages', p.id), p);
	for (const p of products) batch.set(doc(db, 'products', p.id), p);
	for (const n of news) batch.set(doc(db, 'news', n.id), n);
	await batch.commit();
	console.log(`Migrado: site=1, menu=${menu.length}, pages=${pages.length}, products=${products.length}, news=${news.length}`);
	process.exit(0);
}

seed().catch((e) => {
	console.error('SEED_ERROR', e);
	process.exit(1);
});
