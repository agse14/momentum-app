<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SocialFloat from '$lib/components/SocialFloat.svelte';

	let { data, children } = $props();

	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

{#if isAdmin}
	{@render children()}
{:else}
	<Nav site={data.site} menu={data.menu} />
	<main>
		{@render children()}
	</main>
	<Footer site={data.site} />
	<SocialFloat site={data.site} />
{/if}
