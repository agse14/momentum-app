<script lang="ts">
	import { onMount } from 'svelte';
	import { listCol, removeDoc } from '$lib/admin';
	import type { Page } from '$lib/types';

	let pages = $state<Page[]>([]);
	let loading = $state(true);

	async function load() {
		pages = await listCol<Page>('pages', 'order');
		loading = false;
	}

	onMount(load);

	async function del(id: string, title: string) {
		if (!confirm(`¿Eliminar la página "${title}"? Esta acción no se puede deshacer.`)) return;
		await removeDoc('pages', id);
		await load();
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">Páginas</h1>
	<a class="btn btn--sm" href="/admin/pages/new">+ Nueva página</a>
</div>

{#if loading}
	<p>Cargando…</p>
{:else}
	<table class="admin-table" style="margin-top:18px">
		<thead>
			<tr>
				<th>Orden</th><th>Título</th><th>Plantilla</th><th>En home</th><th>Publicada</th><th></th>
			</tr>
		</thead>
		<tbody>
			{#each pages as p (p.id)}
				<tr>
					<td>{p.order}</td>
					<td><a href={'/admin/pages/' + p.id}>{p.title}</a></td>
					<td>{p.template}</td>
					<td>{p.showOnHome ? 'Sí' : '—'}</td>
					<td>{p.published ? 'Sí' : 'No'}</td>
					<td style="text-align:right;white-space:nowrap">
						<a class="btn btn--sm" href={'/admin/pages/' + p.id}>Editar</a>
						<button class="btn btn--sm btn--danger" onclick={() => del(p.id, p.title)}>Eliminar</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
