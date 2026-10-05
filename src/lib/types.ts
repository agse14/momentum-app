export interface Site {
	name: string;
	slogan: string;
	description: string;
	phone: string;
	phoneHref: string;
	whatsapp: string;
	whatsappUrl: string;
	address: string;
	mapsUrl: string;
	email: string;
	facebook: string;
	instagram: string;
	analyticsId: string;
	brandColor: string;
	logo: string;
	coverImage: string;
	coverTitle: string;
	coverSubtitle: string;
	coverButtonLabel: string;
	coverButtonLink: string;
	footerCredit: string;
	footerCreditUrl: string;
	newsTitle: string;
	newsSubtitle: string;
}

export interface MenuItem {
	id: string;
	label: string;
	href: string;
	order: number;
	location: 'main' | 'top';
}

export interface Page {
	id: string;
	title: string;
	order: number;
	template: 'focus' | 'parallax' | 'panel-left' | 'panel-right' | 'panel-center' | 'default';
	excerpt: string;
	content: string;
	image: string;
	gallery: string[];
	showOnHome: boolean;
	published: boolean;
}

export interface Product {
	id: string;
	name: string;
	category: string;
	description: string;
	image: string;
	order: number;
	active: boolean;
}

export interface NewsItem {
	id: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	image: string;
	published: boolean;
}
