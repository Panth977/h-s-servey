<script lang="ts">
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { config } from '$lib/state';
</script>

<Seo />
<Header tralingLogo />
<h1 class="page-margin text-xl mt-2">Select Your Tournament</h1>
{#each $config.sortedEvent as event}
	{#if !event.hidden}
		<a href="/event/{event.id}" class="page-padding mt-5 block">
			<div class="bg-base2 border rounded-lg shadow-xl">
				<h2 class="text-xl mx-3 items-end font-bold py-2">
					{event.title}
					<br />
					<span class="text-xs font-medium">{event.displayDate}</span>
				</h2>
				<!-- <img src={event.poster} alt={event.title} class="w-full rounded-b-lg block object-cover" /> -->
			</div>
		</a>
	{/if}
{/each}
