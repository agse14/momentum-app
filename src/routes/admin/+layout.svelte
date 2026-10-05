<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { authReady, isAdmin, logout } from '$lib/stores/auth';

	let { children } = $props();

	const isLogin = $derived(page.url.pathname === '/admin/login');

	const links = [
		{ href: '/admin', label: 'Inicio' },
		{ href: '/admin/site', label: 'Sitio' },
		{ href: '/admin/pages', label: 'Páginas' },
		{ href: '/admin/products', label: 'Productos' },
		{ href: '/admin/news', label: 'Noticias' },
		{ href: '/admin/menu', label: 'Menú' }
	];

	$effect(() => {
		if (!$authReady) return;
		if (!isLogin && !$isAdmin) goto('/admin/login');
		if (isLogin && $isAdmin) goto('/admin');
	});

	async function doLogout() {
		await logout();
		goto('/admin/login');
	}
</script>

{#if isLogin}
	{@render children()}
{:else if $authReady && $isAdmin}
	<div class="admin">
		<aside class="admin__side">
			<h2>Momentum · Admin</h2>
			{#each links as l (l.href)}
				<a href={l.href} class:active={page.url.pathname === l.href}>{l.label}</a>
			{/each}
			<a href="/" target="_blank">Ver sitio ↗</a>
			<button class="btn btn--sm" style="margin-top:16px" onclick={doLogout}>Cerrar sesión</button>
		</aside>
		<div class="admin__main">
			{@render children()}
		</div>
	</div>
{:else}
	<div class="login-wrap"><p style="color:#fff">Cargando…</p></div>
{/if}
