<script lang="ts">
	import { onMount } from 'svelte';
	import { loadSite } from '$lib/content';
	import { saveDoc } from '$lib/admin';
	import ImageInput from '$lib/components/ImageInput.svelte';
	import type { Site } from '$lib/types';

	let site = $state<Site | null>(null);
	let status = $state('');
	let saving = $state(false);

	onMount(async () => {
		site = await loadSite();
	});

	async function save() {
		if (!site) return;
		saving = true;
		status = '';
		try {
			await saveDoc('site', 'main', site as unknown as Record<string, unknown>);
			status = 'Cambios guardados.';
		} catch (e) {
			status = 'Error: ' + (e as Error).message;
		} finally {
			saving = false;
		}
	}
</script>

<h1>Sitio</h1>

{#if !site}
	<p>Cargando…</p>
{:else}
	{#if status}
		<div class="alert alert--ok">{status}</div>
	{/if}

	<div class="panel">
		<h3>Identidad</h3>
		<div class="grid grid-2">
			<div class="field"><label>Nombre</label><input bind:value={site.name} /></div>
			<div class="field"><label>Eslogan</label><input bind:value={site.slogan} /></div>
		</div>
		<div class="field"><label>Descripción</label><input bind:value={site.description} /></div>
		<div class="field"><label>Color de marca</label><input type="text" bind:value={site.brandColor} /></div>
	</div>

	<div class="panel">
		<h3>Portada (home)</h3>
		<ImageInput bind:value={site.coverImage} label="Imagen de portada" />
		<div class="grid grid-2">
			<div class="field"><label>Título de portada</label><input bind:value={site.coverTitle} /></div>
			<div class="field"><label>Subtítulo</label><input bind:value={site.coverSubtitle} /></div>
			<div class="field"><label>Botón · texto</label><input bind:value={site.coverButtonLabel} /></div>
			<div class="field"><label>Botón · enlace</label><input bind:value={site.coverButtonLink} /></div>
		</div>
		<ImageInput bind:value={site.logo} label="Logotipo" />
	</div>

	<div class="panel">
		<h3>Contacto y redes</h3>
		<div class="grid grid-2">
			<div class="field"><label>Teléfono</label><input bind:value={site.phone} /></div>
			<div class="field"><label>Teléfono (enlace tel:)</label><input bind:value={site.phoneHref} /></div>
			<div class="field"><label>WhatsApp (texto)</label><input bind:value={site.whatsapp} /></div>
			<div class="field"><label>WhatsApp (URL)</label><input bind:value={site.whatsappUrl} /></div>
			<div class="field"><label>Dirección</label><input bind:value={site.address} /></div>
			<div class="field"><label>Correo</label><input bind:value={site.email} /></div>
			<div class="field"><label>Facebook</label><input bind:value={site.facebook} /></div>
			<div class="field"><label>Instagram</label><input bind:value={site.instagram} /></div>
		</div>
	</div>

	<div class="panel">
		<h3>Otros</h3>
		<div class="grid grid-2">
			<div class="field"><label>Google Analytics ID</label><input bind:value={site.analyticsId} /></div>
			<div class="field"><label>Crédito del footer</label><input bind:value={site.footerCredit} /></div>
			<div class="field"><label>Crédito · URL</label><input bind:value={site.footerCreditUrl} /></div>
			<div class="field"><label>Título de novedades</label><input bind:value={site.newsTitle} /></div>
			<div class="field"><label>Subtítulo de novedades</label><input bind:value={site.newsSubtitle} /></div>
		</div>
	</div>

	<button class="btn" onclick={save} disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button>
{/if}
