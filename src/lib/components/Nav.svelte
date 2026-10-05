<script lang="ts">
	import { page } from '$app/state';
	import type { Site, MenuItem } from '$lib/types';

	let { site, menu }: { site: Site | null; menu: MenuItem[] } = $props();

	let scrolled = $state(false);
	let open = $state(false);
	let activeHash = $state('');

	const isHome = $derived(page.url.pathname === '/');
	const solid = $derived(!isHome || scrolled || open);

	const main = $derived(menu.filter((m) => m.location === 'main'));
	const top = $derived(menu.filter((m) => m.location === 'top'));

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 60);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		page.url.pathname;
		open = false;
	});

	// Scrollspy (solo en la home) para marcar la sección activa
	$effect(() => {
		const isHomeNow = page.url.pathname === '/';
		const ids = main
			.filter((m) => m.href.startsWith('/#'))
			.map((m) => m.href.slice(2));
		if (!isHomeNow || !ids.length) {
			activeHash = '';
			return;
		}
		const els = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => !!el);
		if (!els.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeHash = '#' + entry.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	function onClick(e: MouseEvent, href: string) {
		open = false;
		if (!href.startsWith('/#')) return;
		if (page.url.pathname !== '/') return;
		const el = document.querySelector(href.slice(1));
		if (el) {
			e.preventDefault();
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', href);
		}
	}
</script>

<header class="nav" class:nav--solid={solid}>
	<div class="container">
		<div class="nav__inner">
			<a class="nav__brand" href="/#cover" onclick={(e) => onClick(e, '/#cover')}>
				{site?.name ?? 'Momentum Repostería'}
			</a>

			<button
				class="nav__toggle"
				aria-label="Menú"
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span></span><span></span><span></span>
			</button>

			<div class="nav__right" class:nav__right--open={open}>
				<div class="nav__topbar">
					{#each top as item (item.id)}
						<a href={item.href} onclick={(e) => onClick(e, item.href)}>{item.label}</a>
					{/each}
				</div>
				<nav class="nav__menu" role="navigation">
					<ul class="nav__links">
						{#each main as item (item.id)}
							<li>
								<a
									href={item.href}
									class:active={activeHash === item.href.replace('/', '')}
									onclick={(e) => onClick(e, item.href)}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>
</header>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background: transparent;
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}

	.nav--solid {
		background: #f2f3eb;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.18);
	}

	.nav__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 80px;
	}

	.nav__brand {
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 700;
		font-size: 1.5rem;
		letter-spacing: -0.02em;
		color: #f2f3eb;
		line-height: 80px;
	}

	.nav--solid .nav__brand {
		color: #222;
	}

	.nav__right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}

	.nav__topbar {
		display: flex;
		gap: 14px;
		height: 26px;
		align-items: center;
	}

	.nav__topbar a {
		font-size: 12px;
		color: #f2f3eb;
		letter-spacing: 0.02em;
	}

	.nav--solid .nav__topbar a {
		color: #000;
	}

	.nav__topbar a:hover {
		color: #6d8a74;
	}

	.nav__links {
		display: flex;
		gap: 24px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav__links a {
		font-size: 14px;
		text-transform: uppercase;
		color: #f2f3eb;
		padding-bottom: 2px;
		border-bottom: 2px solid transparent;
	}

	.nav--solid .nav__links a {
		color: #333;
	}

	.nav__links a:hover,
	.nav__links a.active {
		color: #6d8a74;
		border-color: #6d8a74;
	}

	.nav__toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
	}

	.nav__toggle span {
		width: 26px;
		height: 3px;
		border-radius: 4px;
		background: #f2f3eb;
		display: block;
	}

	.nav--solid .nav__toggle span {
		background: #333;
	}

	@media (max-width: 960px) {
		.nav__toggle {
			display: flex;
		}

		.nav__right {
			position: fixed;
			inset: 80px 0 auto 0;
			background: #24312b;
			align-items: flex-start;
			gap: 14px;
			padding: 22px;
			transform: translateY(-130%);
			transition: transform 0.3s ease;
		}

		.nav__right--open {
			transform: translateY(0);
		}

		.nav__topbar,
		.nav__links {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
			height: auto;
		}

		.nav__topbar a,
		.nav__links a {
			color: #fff;
		}
	}
</style>
