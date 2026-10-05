<script lang="ts">
	import type { Site } from '$lib/types';

	let { site }: { site: Site | null } = $props();
</script>

<section class="hero" id="cover" style="background-image:url('{site?.coverImage ?? ''}')">
	<div class="hero__overlay"></div>
	<div class="hero__inner">
		{#if site?.logo}
			<img class="hero__logo" src={site.logo} alt={site.name} />
		{:else}
			<h1>{site?.coverTitle ?? site?.name}</h1>
		{/if}
		<p class="hero__subtitle">{site?.coverSubtitle ?? site?.slogan}</p>
		{#if site?.coverButtonLabel}
			<a class="btn" href={site.coverButtonLink}>{site.coverButtonLabel}</a>
		{/if}
	</div>
</section>
