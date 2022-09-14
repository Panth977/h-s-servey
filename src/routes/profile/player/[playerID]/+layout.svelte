<script>
	import Back from '$lib/Icon/Back.svelte';
	import { page } from '$app/stores';
	import { event, selectiveNewsListner, selectiveVideoListner } from '$lib/state';
	import { onMount } from 'svelte';
	$: playerID = $page.params.playerID;
	$: player = $event.players[playerID];

	onMount(function () {
		selectiveNewsListner.connectTo = playerID;
		selectiveVideoListner.connectTo = playerID;
		return function () {
			selectiveNewsListner.connectTo = undefined;
			selectiveVideoListner.connectTo = undefined;
		};
	});
</script>

<div class="bg-base1 -mt-11 pt-11 min-h-screen">
	<a class="header" href="/">Huddle & Score</a>
	<div class="flex mt-1 justify-between mx-8">
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
