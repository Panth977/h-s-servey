<script lang="ts">
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import type { EventTeam } from '$lib/firebase/db';
	import Back from '$lib/Icon/Back.svelte';
	import { event } from '$lib/state';
	let selectedTeam: undefined | EventTeam = undefined;
</script>

<AppDrawer
	bg="base1"
	open={selectedTeam !== undefined}
	close={() => (selectedTeam = undefined)}
	placement="right"
	title={selectedTeam?.name ?? ''}
>
	<div class="grid grid-cols-2 mx-4 gap-4">
		{#if selectedTeam}
			{#each selectedTeam.players as player}
				<a
					on:click={() => (selectedTeam = undefined)}
					href="/profile/player/{player.id}"
					class="w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"
				>
					<div>
						<img
							class="w-[20vw] rounded-full sm:w-20 mx-auto"
							src={player.displayImage}
							alt={player.name}
						/>
						<span class="block mt-2 sm:mt-5 sm:text-xl capitalize">{player.name}</span>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</AppDrawer>
<a class="header" href="/">Huddle & Score</a>
<div class="flex mt-1 justify-between mx-8">
	<button on:click={() => history.back()}><Back /></button>
	<span>Select Teams</span>
	<span />
</div>
<div class="grid grid-cols-2 mx-4 gap-4">
	{#each $event.sortedTeams as team}
		<button
			on:click={() => (selectedTeam = team)}
			class="w-full font-bold py-5 text-center rounded-lg aspect-square mt-5 flex justify-center items-center bg-base1lighter"
		>
			<div>
				<img class="w-[20vw] aspect-square sm:w-20 mx-auto" src={team.logo} alt={team.name} />
				<span class="block mt-2 sm:mt-5 sm:text-xl capitalize">{team.name}</span>
			</div>
		</button>
	{/each}
</div>
