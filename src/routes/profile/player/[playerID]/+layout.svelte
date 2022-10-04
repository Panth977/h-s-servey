<script>
	import { page } from '$app/stores';
	import { event } from '$lib/state';
	import Header from '$lib/Components/Header.svelte';
	$: playerID = $page.params.playerID;
	$: player = $event.players[playerID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<Header title="Player Profile" />

	{#if player}
		<slot />
	{:else}
		No Player Found
	{/if}
</div>
