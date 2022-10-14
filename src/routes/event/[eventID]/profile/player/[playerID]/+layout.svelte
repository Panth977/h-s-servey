<script>
	import { page } from '$app/stores';
	import { eventStore } from '$lib/state';
	import Header from '$lib/Components/Header.svelte';
	$: event = eventStore($page.params.eventID);

	$: player = $event.players[$page.params.playerID];
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<div class="relative z-10">
		<Header title="Player Profile" />
	</div>

	{#if player}
		<slot />
	{:else}
		No Player Found
	{/if}
</div>
