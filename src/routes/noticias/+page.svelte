<script lang="ts">
	let { data } = $props();

	const fmt = (d: string) =>
		new Date(d + 'T12:00:00').toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
</script>

<svelte:head><title>Novedades · Momentum Repostería</title></svelte:head>

<section class="section">
	<div class="container">
		<div class="page-head center">
			<div class="dash dash--center"></div>
			<h1>Novedades</h1>
			<p class="muted">Nuestras últimas creaciones</p>
		</div>
		<div class="grid grid-3">
			{#each data.news as n (n.id)}
				<a class="news-card" href={'/noticias/' + n.id}>
					{#if n.image}<img src={n.image} alt={n.title} />{/if}
					<div class="news-card__body">
						<div class="news-card__meta">{fmt(n.date)}</div>
						<h3>{n.title}</h3>
						<p class="muted">{n.excerpt}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.page-head {
		padding: calc(var(--nav-h) + 50px) 0 40px;
	}
</style>
