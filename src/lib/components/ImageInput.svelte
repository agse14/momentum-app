<script lang="ts">
	import { uploadImage } from '$lib/admin';

	let {
		value = $bindable(''),
		label = 'Imagen',
		folder = 'site'
	}: { value?: string; label?: string; folder?: string } = $props();

	let uploading = $state(false);
	let error = $state('');

	async function onFile(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		uploading = true;
		error = '';
		try {
			value = await uploadImage(file, folder);
		} catch (err) {
			error = (err as Error).message;
		} finally {
			uploading = false;
			input.value = '';
		}
	}
</script>

<div class="field">
	<label>{label}</label>
	<input type="text" bind:value placeholder="/uploads/… o URL de imagen" />
	<input type="file" accept="image/*" onchange={onFile} style="margin-top:8px" />
	{#if uploading}<p class="muted">Subiendo…</p>{/if}
	{#if error}<p class="alert alert--error">{error}</p>{/if}
	{#if value}
		<img src={value} alt="" style="margin-top:10px;max-height:130px;border-radius:8px" />
	{/if}
</div>
