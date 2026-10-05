<script lang="ts">
	import Parallax from '$lib/components/Parallax.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import Gallery from '$lib/components/Gallery.svelte';

	let { data } = $props();
	const page = $derived(data.page);
</script>

<svelte:head>
	<title>{page.title} · Momentum Repostería</title>
	<meta name="description" content={page.excerpt} />
</svelte:head>

{#if page.template === 'parallax'}
	<Parallax {page} />
	{#if page.gallery.length}
		<section class="section">
			<div class="container">
				<Gallery images={page.gallery} />
			</div>
		</section>
	{/if}
{:else if page.template === 'panel-left'}
	<Panel {page} />
{:else if page.template === 'panel-right'}
	<Panel {page} reverse />
{:else if page.template === 'panel-center'}
	<Panel {page} center />
{:else if page.template === 'focus'}
	<section class="section">
		<div class="container">
			<div class="page-head center">
				<div class="dash dash--center"></div>
				<h1>{page.title}</h1>
				{#if page.excerpt}<p class="muted" style="max-width:640px;margin:0 auto 10px">{page.excerpt}</p>{/if}
			</div>
			{#if page.image}
				<img class="page-hero" src={page.image} alt={page.title} />
			{/if}
			<div class="prose" style="max-width:760px;margin:30px auto">
				{@html page.content}
			</div>
			{#if page.gallery.length}
				<Gallery images={page.gallery} />
			{/if}
		</div>
	</section>
{:else}
	<section class="section">
		<div class="container">
			<div class="page-head">
				<div class="dash"></div>
				<h1>{page.title}</h1>
			</div>
			<div class="prose" style="max-width:820px">
				{@html page.content}
			</div>
		</div>
	</section>
{/if}

<style>
	.page-head {
		padding: calc(var(--nav-h) + 60px) 0 10px;
	}

	.page-hero {
		width: 100%;
		max-height: 480px;
		object-fit: cover;
		border-radius: 16px;
		margin: 30px 0;
	}
</style>
