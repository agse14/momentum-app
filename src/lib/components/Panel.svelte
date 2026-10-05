<script lang="ts">
	import type { Page } from '$lib/types';

	let { page, reverse = false, center = false }: { page: Page; reverse?: boolean; center?: boolean } =
		$props();
</script>

<section class="section section--white" id={page.id}>
	<div class="container">
		{#if center}
			<div class="center" style="max-width:760px;margin:0 auto">
				<div class="dash dash--center"></div>
				<h2>{page.title}</h2>
				<div class="prose">{@html page.content}</div>
			</div>
		{:else}
			<div class="panel-side" class:panel-side--reverse={reverse}>
				<div class="panel-side__media" style="background-image:url('{page.image}')"></div>
				<div class="panel-side__content">
					<div>
						<div class="dash"></div>
						<h2>{page.title}</h2>
						<div class="prose">{@html page.content}</div>
						<a class="btn btn--sm" href={'/' + page.id}>Ver más</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
