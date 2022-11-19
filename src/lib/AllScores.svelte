<script lang="ts">
	import type { EventFixture } from '$lib/firebase/db';

	export let fixtures: EventFixture[];
</script>

{#each fixtures as fixture}
	<div class="text-accent1 text-lg justify-around flex items-center">
		<span class="w-10">{fixture.team1.acronym}</span>
		<img src={fixture.team1.logo} alt={fixture.team1.name} class="w-9 h-10" />
		<span class="w-[25%] text-center">
			{fixture.scores?.team1 ?? '--'} - {fixture.scores?.team2 ?? '--'}
		</span>
		<img src={fixture.team2.logo} alt={fixture.team2.name} class="w-9 h-10" />
		<span class="w-10">{fixture.team2.acronym}</span>
	</div>
{/each}
