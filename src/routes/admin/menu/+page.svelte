<script lang="ts">
	import { onMount } from 'svelte';
	import { saveDoc, removeDoc, slugify } from '$lib/admin';
	import { loadMenu } from '$lib/content';
	import type { MenuItem } from '$lib/types';

	let items = $state<MenuItem[]>([]);
	let status = $state('');
	let loading = $state(true);

	async function load() {
		items = await loadMenu();
		loading = false;
	}
	onMount(load);

	function add(location: 'main' | 'top') {
		items = [
			...items,
			{
				id: 'nuevo-' + Date.now(),
				label: 'Nuevo enlace',
				href: '/',
				order: items.filter((i) => i.location === location).length,
				location
			}
		];
	}

	async function saveAll() {
		try {
			for (const item of items) {
				const id = slugify(item.id) || 'item-' + Math.random().toString(36).slice(2, 7);
				item.id = id;
				await saveDoc('menu', id, item as unknown as Record<string, unknown>);
			}
			status = 'Menú guardado.';
			await load();
		} catch (e) {
			status = 'Error: ' + (e as Error).message;
		}
	}

	async function del(id: string) {
		if (!confirm('¿Eliminar este enlace?')) return;
		await removeDoc('menu', id);
		await load();
	}

	const main = $derived(items.filter((i) => i.location === 'main').sort((a, b) => a.order - b.order));
	const top = $derived(items.filter((i) => i.location === 'top').sort((a, b) => a.order - b.order));
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">Menú</h1>
	<button class="btn btn--sm" onclick={saveAll}>Guardar menú</button>
</div>

{#if status}<div class="alert alert--ok">{status}</div>{/if}
{#if loading}
	<p>Cargando…</p>
{:else}
	<div class="panel">
		<div class="row-actions" style="justify-content:space-between">
			<h3 style="margin:0">Menú principal</h3>
			<button class="btn btn--sm" onclick={() => add('main')}>+ Enlace</button>
		</div>
		{#each main as item (item.id)}
			<div class="grid" style="grid-template-columns:1fr 1fr 80px auto;gap:10px;margin-top:10px;align-items:end">
				<div class="field" style="margin:0"><label>Texto</label><input bind:value={item.label} /></div>
				<div class="field" style="margin:0"><label>Enlace</label><input bind:value={item.href} /></div>
				<div class="field" style="margin:0"><label>Orden</label><input type="number" bind:value={item.order} /></div>
				<button class="btn btn--sm btn--danger" onclick={() => del(item.id)}>X</button>
			</div>
		{/each}
	</div>

	<div class="panel">
		<div class="row-actions" style="justify-content:space-between">
			<h3 style="margin:0">Barra superior</h3>
			<button class="btn btn--sm" onclick={() => add('top')}>+ Enlace</button>
		</div>
		{#each top as item (item.id)}
			<div class="grid" style="grid-template-columns:1fr 1fr 80px auto;gap:10px;margin-top:10px;align-items:end">
				<div class="field" style="margin:0"><label>Texto</label><input bind:value={item.label} /></div>
				<div class="field" style="margin:0"><label>Enlace</label><input bind:value={item.href} /></div>
				<div class="field" style="margin:0"><label>Orden</label><input type="number" bind:value={item.order} /></div>
				<button class="btn btn--sm btn--danger" onclick={() => del(item.id)}>X</button>
			</div>
		{/each}
	</div>
{/if}
