<script lang="ts">
	let { data } = $props();
	const item = $derived(data.item);
	const fmt = (d: string) =>
		new Date(d + 'T12:00:00').toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>{item.title} · Momentum Repostería</title>
	<meta name="description" content={item.excerpt} />
</svelte:head>

<article class="section" style="padding-top:calc(var(--nav-h) + 60px)">
	<div class="container" style="max-width:820px">
		<div class="center">
			<div class="news-card__meta">{fmt(item.date)}</div>
			<h1>{item.title}</h1>
		</div>
		{#if item.image}
			<img
				src={item.image}
				alt={item.title}
				style="width:100%;max-height:480px;object-fit:cover;border-radius:16px;margin:24px 0"
			/>
		{/if}
		<div class="prose">{@html item.content}</div>
		<p style="margin-top:40px"><a class="btn btn--sm" href="/noticias">← Volver a novedades</a></p>
	</div>
</article>
