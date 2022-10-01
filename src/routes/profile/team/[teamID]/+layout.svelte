<script>
	import { page } from '$app/stores';
	import { event } from '$lib/state';
	import Header from '$lib/Components/Header.svelte';
	$: teamID = $page.params.teamID;
	$: team = $event.teams[teamID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<Header title="Team Profile" />

	{#if team}
		<slot />
	{:else}
		No Team Found
	{/if}
</div>
