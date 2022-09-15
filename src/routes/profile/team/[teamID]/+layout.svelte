<script>
	import Back from '$lib/Icon/Back.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/state';
	$: teamID = $page.params.teamID;
	$: team = $event.teams[teamID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<a class="header" href="/">Huddle & Score</a>
	<div class="flex mt-1 justify-between mx-8">
		<button on:click={() => history.back()}><Back /></button>
		<span>Team Profile</span>
		<span />
	</div>

	{#if team}
		<slot />
	{:else}
		No Team Found
	{/if}
</div>
