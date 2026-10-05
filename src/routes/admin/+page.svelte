<script lang="ts">
	import { onMount } from 'svelte';
	import { listCol } from '$lib/admin';

	let counts = $state({ pages: 0, products: 0, news: 0, menu: 0 });

	onMount(async () => {
		const [pages, products, news, menu] = await Promise.all([
			listCol('pages'),
			listCol('products'),
			listCol('news'),
			listCol('menu')
		]);
		counts = {
			pages: pages.length,
			products: products.length,
			news: news.length,
			menu: menu.length
		};
	});
</script>

<h1>Bienvenido</h1>
<p class="muted">
	Administra el sitio de Momentum Repostería: contenido, productos, noticias y menú. Los cambios se
	publican al instante.
</p>

<div class="grid grid-4" style="margin-top:24px">
	<a class="panel" href="/admin/pages"><strong>{counts.pages}</strong><br />Páginas</a>
	<a class="panel" href="/admin/products"><strong>{counts.products}</strong><br />Productos</a>
	<a class="panel" href="/admin/news"><strong>{counts.news}</strong><br />Noticias</a>
	<a class="panel" href="/admin/menu"><strong>{counts.menu}</strong><br />Menú</a>
</div>
