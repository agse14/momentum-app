<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveDoc, removeDoc, slugify } from '$lib/admin';
	import ImageInput from '$lib/components/ImageInput.svelte';
	import type { Page } from '$lib/types';

	let { data } = $props();

	const isNew = $derived(!data.page);
	let slug = $state(data.page?.id ?? '');
	let page = $state<Page>(
		data.page ?? {
			id: '',
			title: '',
			order: 99,
			template: 'default',
			excerpt: '',
			content: '',
			image: '',
			gallery: [],
			showOnHome: false,
			published: true
		}
	);
	let status = $state('');
	let saving = $state(false);

	$effect(() => {
		if (data.page) {
			slug = data.page.id;
			page = { ...data.page };
		}
	});

	const templates = [
		{ value: 'focus', label: 'Focus (galería)' },
		{ value: 'parallax', label: 'Parallax' },
		{ value: 'panel-left', label: 'Panel (imagen izq.)' },
		{ value: 'panel-right', label: 'Panel (imagen der.)' },
		{ value: 'panel-center', label: 'Panel centrado' },
		{ value: 'default', label: 'Página simple' }
	];

	function addGallery() {
		page.gallery = [...page.gallery, ''];
	}
	function removeGallery(i: number) {
		page.gallery = page.gallery.filter((_, idx) => idx !== i);
	}

	async function save() {
		const id = isNew ? slugify(slug || page.title) : slug;
		if (!id) {
			status = 'Debes indicar un identificador (slug).';
			return;
		}
		saving = true;
		status = '';
		try {
			page.id = id;
			await saveDoc('pages', id, page as unknown as Record<string, unknown>);
			status = 'Guardado.';
			if (isNew) goto('/admin/pages/' + id);
		} catch (e) {
			status = 'Error: ' + (e as Error).message;
		} finally {
			saving = false;
		}
	}

	async function del() {
		if (!isNew && confirm('¿Eliminar esta página?')) {
			await removeDoc('pages', slug);
			goto('/admin/pages');
		}
	}
</script>

<div class="row-actions" style="justify-content:space-between">
	<h1 style="margin:0">{isNew ? 'Nueva página' : 'Editar: ' + page.title}</h1>
	<a href="/admin/pages">← Volver</a>
</div>

{#if status}<div class="alert alert--ok">{status}</div>{/if}

<div class="panel">
	<div class="grid grid-2">
		<div class="field">
			<label>Identificador (URL)</label>
			<input bind:value={slug} disabled={!isNew} placeholder="mi-pagina" />
		</div>
		<div class="field"><label>Título</label><input bind:value={page.title} /></div>
		<div class="field"><label>Orden</label><input type="number" bind:value={page.order} /></div>
		<div class="field">
			<label>Plantilla</label>
			<select bind:value={page.template}>
				{#each templates as t (t.value)}<option value={t.value}>{t.label}</option>{/each}
			</select>
		</div>
	</div>
	<div class="field"><label>Extracto</label><textarea bind:value={page.excerpt}></textarea></div>
	<div class="field">
		<label>Contenido (HTML)</label>
		<textarea bind:value={page.content} style="min-height:200px;font-family:monospace"></textarea>
	</div>
	<div class="grid grid-2">
		<div class="field">
			<label>Opciones</label>
			<label style="text-transform:none;font-weight:400">
				<input type="checkbox" bind:checked={page.showOnHome} style="width:auto" /> Mostrar en home
			</label>
			<label style="text-transform:none;font-weight:400">
				<input type="checkbox" bind:checked={page.published} style="width:auto" /> Publicada
			</label>
		</div>
	</div>
	<ImageInput bind:value={page.image} label="Imagen principal" folder="pages" />
</div>

<div class="panel">
	<div class="row-actions" style="justify-content:space-between">
		<h3 style="margin:0">Galería ({page.gallery.length})</h3>
		<button class="btn btn--sm" onclick={addGallery}>+ Añadir imagen</button>
	</div>
	{#each page.gallery as _, i (i)}
		<div style="display:flex;gap:12px;align-items:flex-start;margin-top:12px">
			<div style="flex:1">
				<ImageInput bind:value={page.gallery[i]} label={'Imagen ' + (i + 1)} folder="pages" />
			</div>
			<button class="btn btn--sm btn--danger" style="margin-top:26px" onclick={() => removeGallery(i)}>
				Quitar
			</button>
		</div>
	{/each}
</div>

<div class="row-actions">
	<button class="btn" onclick={save} disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
	{#if !isNew}<button class="btn btn--danger" onclick={del}>Eliminar</button>{/if}
</div>
