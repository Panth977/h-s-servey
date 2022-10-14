<script>
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { eventStore } from '$lib/state';
	import { page } from '$app/stores';
	$: event = eventStore($page.params.eventID);
</script>

<Seo />
<Header tralingLogo title="Player Rankings" />
<div class="bg-base2">
	<div class="text-base1 hide-scroll-bar overflow-x-auto">
		<table class="w-full text-sm text-left">
			<thead class="text-xs">
				<tr class="page-margin x-7 bg-base1light">
					<th class="py-2 font-medium pr-2 pl-2" scope="col">Pos</th>
					<th class="py-2 font-medium pr-4" scope="col">Player</th>
					<th class="py-2 font-medium pr-3" scope="col">M</th>
					<th class="py-2 font-medium pr-3" scope="col">G</th>
					<th class="py-2 font-medium pr-3" scope="col">A</th>
					<th class="py-2 font-medium pr-3" scope="col">Y</th>
					<th class="py-2 font-medium pr-2" scope="col">R</th>
				</tr>
			</thead>
			<tbody>
				{#each $event.sortedPlayers as player, i}
					<tr class="page-margin border-b border-base1/50">
						<td class="py-2 pr-2 pl-2">{i + 1}</td>
						<th class="py-2 pr-4 font-medium text-gray-900 whitespace-nowrap" scope="row">
							<a
								href="/event/{$page.params.eventID}/profile/player/{player.id}"
								class="flex items-center"
							>
								<img src={player.team.logo} alt={player.team.name} class="object-cover h-4 mr-2" />
								{player.name}
							</a>
						</th>
						<td class="py-2 pr-3">{player.matchesPlayed ?? 0}</td>
						<td class="py-2 pr-3">{player.goals ?? 0}</td>
						<td class="py-2 pr-3">{player.assists ?? 0}</td>
						<td class="py-2 pr-3">{player.yellowCard ?? 0}</td>
						<td class="py-2 pr-2">{player.redCard ?? 0}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
