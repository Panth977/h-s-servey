<script>
	import Back from '$lib/Icon/Back.svelte';
	import { event } from '$lib/state';
</script>

<a class="header" href="/">Huddle & Score</a>
<div class="contrast pb-9 mt-1">
	<div class="flex h-4 justify-between page-margin">
		<button on:click={() => history.back()}><Back /></button>
		<span>Team Rankings</span>
		<span />
	</div>
</div>
<div class="bg-base2">
	<div class="text-base1 hide-scroll-bar overflow-x-auto">
		<table class="w-full text-sm text-left">
			<thead class="text-xs">
				<tr class="page-margin x-7 bg-base1light">
					<th class="py-2 font-medium pr-2 pl-2" scope="col">Pos</th>
					<th class="py-2 font-medium pr-4" scope="col">Teams</th>
					<!-- <th class="py-2 font-medium pr-4" scope="col" /> -->
					<th class="py-2 font-medium pr-3" scope="col">M</th>
					<th class="py-2 font-medium pr-3" scope="col">W</th>
					<th class="py-2 font-medium pr-3" scope="col">L</th>
					<th class="py-2 font-medium pr-3" scope="col">P</th>
					<th class="py-2 font-medium pr-3" scope="col">GS</th>
					<th class="py-2 font-medium pr-3" scope="col">GC</th>
					<th class="py-2 font-medium pr-2" scope="col">GD</th>
				</tr>
			</thead>
			<tbody>
				{#each $event.sortedTeams as team, i}
					<tr class="page-margin border-b border-base1/50">
						<td class="py-2 pr-2 pl-2">{i + 1}</td>
						<th class="py-2 pr-4 font-medium text-gray-900 whitespace-nowrap" scope="row">
							<a href="/profile/team/{team.id}" class="flex items-center">
								<img src={team.logo} alt={team.name} class="object-cover h-4 mr-2" />
								{team.acronym}
							</a>
						</th>
						<!-- <th class="py-2 pr-4 font-medium text-gray-900 whitespace-nowrap" scope="row" /> -->
						<td class="py-2 pr-3">{team.matchesPlayed ?? 0}</td>
						<td class="py-2 pr-3">{team.won ?? 0}</td>
						<td class="py-2 pr-3">{team.loss ?? 0}</td>
						<td class="py-2 pr-3">{team.points ?? 0}</td>
						<td class="py-2 pr-3">{team.goalScored ?? 0}</td>
						<td class="py-2 pr-3">{team.goalConceived ?? 0}</td>
						<td class="py-2 pr-2">{team.goalDifference ?? 0}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
