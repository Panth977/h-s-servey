<script>
	import Header from '$lib/Components/Header.svelte';

	import Seo from '$lib/Components/Seo.svelte';
	import { auth, config } from '$lib/state';
	import { page } from '$app/stores';
	import Card from '$lib/Components/Card.svelte';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	$: form = $config.forms[$page.params.formID];
	let open = true;
</script>

<Seo />
<Header tralingLogo title={form.title} />
<!-- {#if form && form.consent}
	<AppDrawer bg="base2" title="Consent" {open} close={() => (open = false)}>
		<div class="page-margin">
			{#each form.consent.split('\n') as parag}
				{#if parag.trim()[0] === '→'}
					<li class="ml-3 list-disc">{parag.trim().substring(1)}</li>
				{:else}
					<p class="ml-3 first-letter:text-xl">{parag.trim()}</p>
				{/if}
				<br />
			{/each}
		</div>
	</AppDrawer>
{/if} -->
{#if form}
	<iframe class="w-full h-screen" title="{form.title} form" src={form.url}> Loading… </iframe>
{:else}
	<div class="page-margin mt-5">404: No Form Found</div>
{/if}
