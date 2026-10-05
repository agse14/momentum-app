<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FocusCards from '$lib/components/FocusCards.svelte';
	import Parallax from '$lib/components/Parallax.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import News from '$lib/components/News.svelte';

	let { data } = $props();

	const focus = $derived(data.pages.filter((p: any) => p.showOnHome).slice(0, 3));
	const brunch = $derived(data.pages.find((p: any) => p.id === 'brunch-coffee'));
	const productos = $derived(data.pages.find((p: any) => p.id === 'nuestros-productos'));
	const nosotros = $derived(data.pages.find((p: any) => p.id === 'nosotros'));
	const contacto = $derived(data.pages.find((p: any) => p.id === 'contacto'));
</script>

<Hero site={data.site} />

<FocusCards pages={focus} />

{#if brunch}
	<Parallax page={brunch} />
{/if}

{#if productos}
	<Panel page={productos} reverse />
{/if}

{#if nosotros}
	<Panel page={nosotros} />
{/if}

{#if contacto}
	<Panel page={contacto} center />
{/if}

<News news={data.news} site={data.site} />
