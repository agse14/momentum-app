<script lang="ts">
	import { onMount } from 'svelte';
	import { listCol, removeDoc } from '$lib/admin';
	import type { NewsItem } from '$lib/types';

	let items = $state<NewsItem[]>([]);
	let loading = $state(true);

	async function load() {
		items = (await listCol<NewsItem>('news')).sort((a, b) => (a.date < b.date ? 1 : -1));
		loading = false;
	}
	onMount(load);

	async function del(id: string, title: string) {
		if (!confirm(`¿Eliminar "${title}"?`)) return;
		await removeDoc('news', id);
		await load();
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">Noticias</h1>
	<a class="btn btn--sm" href="/admin/news/new">+ Nueva noticia</a>
</div>

{#if loading}
	<p>Cargando…</p>
{:else}
	<table class="admin-table" style="margin-top:18px">
		<thead><tr><th>Fecha</th><th>Título</th><th>Publicada</th><th></th></tr></thead>
		<tbody>
			{#each items as n (n.id)}
				<tr>
					<td>{n.date}</td>
					<td><a href={'/admin/news/' + n.id}>{n.title}</a></td>
					<td>{n.published ? 'Sí' : 'No'}</td>
					<td style="text-align:right;white-space:nowrap">
						<a class="btn btn--sm" href={'/admin/news/' + n.id}>Editar</a>
						<button class="btn btn--sm btn--danger" onclick={() => del(n.id, n.title)}>Eliminar</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
