<script lang="ts">
	import { onMount } from 'svelte';
	import { listCol, removeDoc } from '$lib/admin';
	import type { Product } from '$lib/types';

	let items = $state<Product[]>([]);
	let loading = $state(true);

	async function load() {
		items = (await listCol<Product>('products', 'order')).sort((a, b) => a.order - b.order);
		loading = false;
	}
	onMount(load);

	async function del(id: string, name: string) {
		if (!confirm(`¿Eliminar "${name}"?`)) return;
		await removeDoc('products', id);
		await load();
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">Productos</h1>
	<a class="btn btn--sm" href="/admin/products/new">+ Nuevo producto</a>
</div>

{#if loading}
	<p>Cargando…</p>
{:else}
	<table class="admin-table" style="margin-top:18px">
		<thead><tr><th>Orden</th><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Activo</th><th></th></tr></thead>
		<tbody>
			{#each items as p (p.id)}
				<tr>
					<td>{p.order}</td>
					<td>{#if p.image}<img src={p.image} alt="" style="width:56px;height:56px;object-fit:cover;border-radius:8px" />{/if}</td>
					<td><a href={'/admin/products/' + p.id}>{p.name}</a></td>
					<td>{p.category}</td>
					<td>{p.active ? 'Sí' : 'No'}</td>
					<td style="text-align:right;white-space:nowrap">
						<a class="btn btn--sm" href={'/admin/products/' + p.id}>Editar</a>
						<button class="btn btn--sm btn--danger" onclick={() => del(p.id, p.name)}>Eliminar</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
