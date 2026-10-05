<script lang="ts">
	import type { Site } from '$lib/types';

	let { site }: { site: Site | null } = $props();
</script>

{#if site}
	<div class="social-float">
		<a href={site.whatsappUrl} target="_blank" rel="noopener" aria-label="WhatsApp">
			<img src="/img/whatsapp.png" alt="WhatsApp" />
		</a>
		<a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook">
			<img src="/img/facebook.png" alt="Facebook" />
		</a>
		<a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram">
			<img src="/img/instagram.png" alt="Instagram" />
		</a>
	</div>
{/if}
