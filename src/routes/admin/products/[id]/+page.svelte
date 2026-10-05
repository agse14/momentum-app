<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveDoc, removeDoc, slugify } from '$lib/admin';
	import ImageInput from '$lib/components/ImageInput.svelte';
	import type { Product } from '$lib/types';

	let { data } = $props();
	const isNew = $derived(!data.product);
	let id = $state(data.product?.id ?? '');
	let item = $state<Product>(
		data.product ?? {
			id: '',
			name: '',
			category: 'Pasteles',
			description: '',
			image: '',
			order: 99,
			active: true
		}
	);
	let status = $state('');

	$effect(() => {
		if (data.product) {
			id = data.product.id;
			item = { ...data.product };
		}
	});

	async function save() {
		const key = isNew ? slugify(id || item.name) : id;
		if (!key) {
			status = 'Indica un identificador.';
			return;
		}
		try {
			item.id = key;
			await saveDoc('products', key, item as unknown as Record<string, unknown>);
			status = 'Guardado.';
			if (isNew) goto('/admin/products/' + key);
		} catch (e) {
			status = 'Error: ' + (e as Error).message;
		}
	}

	async function del() {
		if (!isNew && confirm('¿Eliminar producto?')) {
			await removeDoc('products', id);
			goto('/admin/products');
		}
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">{isNew ? 'Nuevo producto' : 'Editar: ' + item.name}</h1>
	<a href="/admin/products">← Volver</a>
</div>

{#if status}<div class="alert alert--ok">{status}</div>{/if}

<div class="panel">
	<div class="grid grid-2">
		<div class="field"><label>Identificador</label><input bind:value={id} disabled={!isNew} /></div>
		<div class="field"><label>Nombre</label><input bind:value={item.name} /></div>
		<div class="field"><label>Categoría</label><input bind:value={item.category} /></div>
		<div class="field"><label>Orden</label><input type="number" bind:value={item.order} /></div>
	</div>
	<div class="field"><label>Descripción</label><textarea bind:value={item.description}></textarea></div>
	<label style="text-transform:none">
		<input type="checkbox" bind:checked={item.active} style="width:auto" /> Activo
	</label>
	<ImageInput bind:value={item.image} label="Imagen" folder="products" />
</div>

<div class="row-actions">
	<button class="btn" onclick={save}>Guardar</button>
	{#if !isNew}<button class="btn btn--danger" onclick={del}>Eliminar</button>{/if}
</div>
