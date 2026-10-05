<script lang="ts">
	let { images }: { images: string[] } = $props();

	let index = $state<number | null>(null);

	function close() {
		index = null;
	}
	function prev() {
		if (index === null) return;
		index = (index - 1 + images.length) % images.length;
	}
	function next() {
		if (index === null) return;
		index = (index + 1) % images.length;
	}
	function onKey(e: KeyboardEvent) {
		if (index === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window on:keydown={onKey} />

{#if images.length}
	<div class="gallery">
		{#each images as src, i (src + i)}
			<button type="button" onclick={() => (index = i)} aria-label="Ampliar imagen {i + 1}">
				<img {src} alt="Producto {i + 1}" loading="lazy" />
			</button>
		{/each}
	</div>
{/if}

{#if index !== null}
	<div class="lightbox" role="dialog" aria-modal="true">
		<button class="lightbox__close" onclick={close} aria-label="Cerrar">×</button>
		{#if images.length > 1}
			<button class="lightbox__nav lightbox__nav--prev" onclick={prev} aria-label="Anterior">‹</button>
			<button class="lightbox__nav lightbox__nav--next" onclick={next} aria-label="Siguiente">›</button>
		{/if}
		<img src={images[index]} alt="Imagen ampliada" />
	</div>
{/if}
