<script lang="ts">
	import type { Page } from '$lib/types';

	let { page }: { page: Page } = $props();
</script>

<section class="band" id={page.id} style="background-image:url('{page.image}')">
	<div class="band__overlay"></div>
	<div class="container">
		<div class="dash dash--center"></div>
		<h2>{page.title}</h2>
		<div class="prose">{@html page.content}</div>
	</div>
</section>
