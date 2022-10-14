<script lang="ts">
	import { page } from '$app/stores';
	import { eventStore } from '$lib/state';
	import type { EventPlayer } from '$lib/firebase/db';
	$: event = eventStore($page.params.eventID);

	$: team = $event.teams[$page.params.teamID];

	$: playersType = team.players.reduce<{ [position in EventPlayer['position']]: EventPlayer[] }>(
		function (prv, player) {
			prv[player.position].push(player);
			return prv;
		},
		{
			Forward: [],
			Midfield: [],
			Defence: [],
			Goalkeeper: []
		}
	);
</script>

{#each [{ title: 'Goal Keeper', players: playersType['Goalkeeper'] }, { title: 'Defender', players: playersType['Defence'] }, { title: 'Midfielders', players: playersType['Midfield'] }, { title: 'Attackers', players: playersType['Forward'] }] as { title, players }}
	<h2 class="mt-8 capitalize font-bold text-xl page-margin">{title}</h2>
	{#if players.length}
		{#each players as player}
			<a
				href="event/{$page.params.eventID}/profile/player/{player.id}"
				class="flex mt-5 page-margin"
			>
				<img src={player.displayImage} alt={player.name} class="rounded-full bg-base2 h-16" />
				<div class="ml-3">
					<div class="font-bold">{player.name}</div>
					<div class="mt-1">{player.place}</div>
				</div>
			</a>
		{/each}
	{:else}
		<span class="mx-10"> No Player </span>
	{/if}
{/each}
