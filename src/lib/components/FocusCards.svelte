<script lang="ts">
	import type { Page } from '$lib/types';

	let { pages }: { pages: Page[] } = $props();
</script>

<section class="section section--white" id="focus">
	<div class="container">
		<div class="grid grid-3">
			{#each pages as p (p.id)}
				<a class="focus-item" href={'/' + p.id}>
					{#if p.image}<img src={p.image} alt={p.title} />{/if}
					<h3>{p.title}</h3>
					<p class="muted">{p.excerpt}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
