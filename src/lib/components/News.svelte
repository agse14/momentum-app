<script lang="ts">
	import type { NewsItem, Site } from '$lib/types';

	let { news, site }: { news: NewsItem[]; site: Site | null } = $props();

	const fmt = (d: string) => {
		const date = new Date(d + 'T12:00:00');
		return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
	};
</script>

{#if news.length}
	<section class="section" id="novedades">
		<div class="container">
			<div class="center" style="margin-bottom:44px">
				<div class="dash dash--center"></div>
				<h2>{site?.newsTitle ?? 'Novedades'}</h2>
				<p class="muted">{site?.newsSubtitle ?? ''}</p>
			</div>
			<div class="grid grid-3">
				{#each news.slice(0, 3) as n (n.id)}
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
{/if}
