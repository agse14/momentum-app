<script lang="ts">
	import type { Site } from '$lib/types';

	let { site }: { site: Site | null } = $props();
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container footer__inner">
		<p>
			© {year}
			{site?.name ?? 'Momentum Repostería'} ·
			<a href="/aviso-de-privacidad">Aviso de Privacidad</a>
		</p>
		{#if site?.footerCredit}
			<p>
				Desarrollado por
				<a href={site.footerCreditUrl} target="_blank" rel="noopener">{site.footerCredit}</a>
			</p>
		{/if}
	</div>
</footer>
