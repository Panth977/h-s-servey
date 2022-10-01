<script>
	import Back from '$lib/Icon/Back.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/state';
	$: playerID = $page.params.playerID;
	$: player = $event.players[playerID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<a class="header" href="/">Huddle & Score</a>
	<div class="flex mt-1 justify-between page-margin">
		<button on:click={() => history.back()}><Back /></button>
		<span>Player Profile</span>
		<span />
	</div>

	{#if player}
		<slot />
	{:else}
		No Player Found
	{/if}
</div>
