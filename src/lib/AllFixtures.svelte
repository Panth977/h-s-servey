<script lang="ts">
	import type { EventFixture } from '$lib/firebase/db';

	export let fixtures: EventFixture[];

	export let showMaxDays = 0;

	$: combineFixtures = fixtures.reduce<{ date: string; fixtures: EventFixture[] }[]>(function (
		prv,
		fixture
	) {
		const last = prv[prv.length - 1];
		if (fixture.displayDate === last?.date) last.fixtures.push(fixture);
		else prv.push({ date: fixture.displayDate, fixtures: [fixture] });
		return prv;
	},
	[]);
</script>

{#each showMaxDays ? combineFixtures.splice(0, showMaxDays) : combineFixtures as fixtures}
	<div class="bg-base1light text-sm mt-3 page-padding py-1">{fixtures.date}</div>
	{#each fixtures.fixtures as fixture}
		<div class="text-accent1 text-lg justify-around flex items-center">
			<span class="w-10">{fixture.team1.acronym}</span>
			<img src={fixture.team1.logo} alt={fixture.team1.name} class="w-9 h-10" />
			{#if fixture.isUpcomming}
				<span class="border text-center text-xs p-1 w-[25%]">{fixture.displayTime}</span>
			{:else}
				<span class="w-[25%] text-center">
					{fixture.scores?.team1 ?? 0} - {fixture.scores?.team2 ?? 0}
				</span>
			{/if}
			<img src={fixture.team2.logo} alt={fixture.team2.name} class="w-9 h-10" />
			<span class="w-10">{fixture.team2.acronym}</span>
		</div>
	{/each}
{/each}
