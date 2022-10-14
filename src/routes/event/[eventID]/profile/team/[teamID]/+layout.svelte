<script>
	import { page } from '$app/stores';
	import { eventStore } from '$lib/state';
	import Header from '$lib/Components/Header.svelte';
	$: event = eventStore($page.params.eventID);

	$: team = $event.teams[$page.params.teamID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<Header title="Team Profile" />

	{#if team}
		<slot />
	{:else}
		No Team Found
	{/if}
</div>
