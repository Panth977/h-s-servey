<script>
	import Header from '$lib/Components/Header.svelte';

	import Seo from '$lib/Components/Seo.svelte';
	import { config } from '$lib/state';
	import { page } from '$app/stores';
	$: form = $config.forms[$page.params.formID];
</script>

<Seo />
{#if form}
	<Header tralingLogo title={form.title} />
	<iframe class="w-full h-screen" title="{form.title} form" src={form.url}> Loading… </iframe>
{:else}
	404: No Form Found
{/if}
