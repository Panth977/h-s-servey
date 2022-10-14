<script>
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { eventStore } from '$lib/state';
	import { page } from '$app/stores';
	$: event = eventStore($page.params.eventID);
</script>

<Seo />
<Header tralingLogo title="Teams" />
<div class="grid grid-cols-2 mx-4 gap-4">
	{#each $event.sortedTeams as team}
		<a
			href="/event/{$page.params.eventID}/profile/team/{team.id}"
			class="w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"
		>
			<div>
				<img class="w-[20vw] sm:w-20 mx-auto" src={team.logo} alt={team.name} />
				<span class="block mt-2 sm:mt-5 sm:text-xl capitalize">{team.name}</span>
			</div>
		</a>
	{/each}
</div>
