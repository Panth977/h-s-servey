<script>
	import Back from '$lib/Icon/Back.svelte';
	import { page } from '$app/stores';
	import { event, selectiveNewsListner, selectiveVideoListner } from '$lib/state';
	import { onMount } from 'svelte';
	$: teamID = $page.params.teamID;
	$: team = $event.teams[teamID];

	onMount(function () {
		selectiveNewsListner.connectTo = teamID;
		selectiveVideoListner.connectTo = teamID;
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
		<span>Team Profile</span>
		<span />
	</div>

	{#if team}
		<slot />
	{:else}
		No Team Found
	{/if}
</div>
