<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveDoc, removeDoc, slugify } from '$lib/admin';
	import ImageInput from '$lib/components/ImageInput.svelte';
	import type { NewsItem } from '$lib/types';

	let { data } = $props();
	const isNew = $derived(!data.item);
	let id = $state(data.item?.id ?? '');
	let item = $state<NewsItem>(
		data.item ?? {
			id: '',
			title: '',
			date: new Date().toISOString().slice(0, 10),
			excerpt: '',
			content: '',
			image: '',
			published: true
		}
	);
	let status = $state('');

	$effect(() => {
		if (data.item) {
			id = data.item.id;
			item = { ...data.item };
		}
	});

	async function save() {
		const key = isNew ? slugify(id || item.title) : id;
		if (!key) {
			status = 'Indica un identificador.';
			return;
		}
		try {
			item.id = key;
			await saveDoc('news', key, item as unknown as Record<string, unknown>);
			status = 'Guardado.';
			if (isNew) goto('/admin/news/' + key);
		} catch (e) {
			status = 'Error: ' + (e as Error).message;
		}
	}

	async function del() {
		if (!isNew && confirm('¿Eliminar noticia?')) {
			await removeDoc('news', id);
			goto('/admin/news');
		}
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">{isNew ? 'Nueva noticia' : 'Editar: ' + item.title}</h1>
	<a href="/admin/news">← Volver</a>
</div>

{#if status}<div class="alert alert--ok">{status}</div>{/if}

<div class="panel">
	<div class="grid grid-2">
		<div class="field"><label>Identificador (URL)</label><input bind:value={id} disabled={!isNew} /></div>
		<div class="field"><label>Título</label><input bind:value={item.title} /></div>
		<div class="field"><label>Fecha</label><input type="date" bind:value={item.date} /></div>
	</div>
	<div class="field"><label>Extracto</label><textarea bind:value={item.excerpt}></textarea></div>
	<div class="field">
		<label>Contenido (HTML)</label>
		<textarea bind:value={item.content} style="min-height:180px;font-family:monospace"></textarea>
	</div>
	<label style="text-transform:none">
		<input type="checkbox" bind:checked={item.published} style="width:auto" /> Publicada
	</label>
	<ImageInput bind:value={item.image} label="Imagen" folder="news" />
</div>

<div class="row-actions">
	<button class="btn" onclick={save}>Guardar</button>
	{#if !isNew}<button class="btn btn--danger" onclick={del}>Eliminar</button>{/if}
</div>
