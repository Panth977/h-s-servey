<script lang="ts">
	import { eventStore, latestNewsListner, latestVideosListner } from '$lib/state';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import Ads from '$lib/Components/Ads.svelte';
	import AllFixtures from '$lib/AllFixtures.svelte';
	import LocationPin from '$lib/Icon/LocationPin.svelte';
	import AllNews from '$lib/AllNews.svelte';
	import AllVideos from '$lib/AllVideos.svelte';
	import Card from '$lib/Components/Card.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { page } from '$app/stores';
	import AllScores from '$lib/AllScores.svelte';

	$: event = eventStore($page.params.eventID);

	$: currentFixture = $event.fixtures.find((_, i, a) => a[i + 1]?.isUpcomming ?? true);
	let upcomingMatchDrawer = false;
	let matchScoresDrawer = false;
	let latestNewsDrawer = false;
	let latestVideosDrawer = false;
	const latestNews = latestNewsListner($page.params.eventID).store;
	const latestVideos = latestVideosListner($page.params.eventID).store;
	$: topPlayers = $event.sortedPlayers.slice(0, 3);
	$: topTeams = $event.sortedTeams.slice(0, 3);
</script>

<Seo />
<a class="header" style="padding-bottom: 0;" href="/">Huddle & Score</a>
<div class="page-padding -mt-1 items-center flex space-x-1">
	<LocationPin />
	<span class="text-sm">Ahmedabad</span>
</div>
{#if currentFixture}
	<div class="flex bg-base2 mt-5 page-padding">
		<div
			style="width: 9.81px; background-color: {currentFixture.team1
				.color}; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
		/>
		<div class="w-full text-xl items-center flex justify-around pb-4 pt-5 font-medium">
			<span>{currentFixture.team1.acronym}</span>
			<img src={currentFixture.team1.logo} alt={currentFixture.team1.name} class="w-9 h-10" />
			<span class="whitespace-nowrap">
				{currentFixture.scores?.team1 ?? 0} - {currentFixture.scores?.team2 ?? 0}
			</span>
			<img src={currentFixture.team2.logo} alt={currentFixture.team1.name} class="w-9 h-10" />
			<span>{currentFixture.team2.acronym}</span>
		</div>
		<div
			style="width: 9.81px; background-color: {currentFixture.team2
				.color}; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
		/>
	</div>
{/if}
{#if $event.liveStream}
	<a class="text-center" href={$event.liveStream} target="_blank">
		<div class="bg-danger mt-3 py-2 h-9">Watch Live Stream</div>
	</a>
{/if}
<Ads />
{#if $event.fixtures.length}
	<Card
		titleDiv={false}
		viewMore={{ placeholder: 'All Fixtures', onClick: () => (upcomingMatchDrawer = true) }}
		title="All Fixtures"
	>
		{#if $event.upcommingFixtures.length}
			<AllFixtures showMaxDays={1} fixtures={$event.upcommingFixtures.slice(0, 3)} />
		{:else}
			<AllFixtures showMaxDays={1} fixtures={$event.fixtures.slice($event.fixtures.length - 3)} />
			<!-- <div class="text-center py-5">No Upcoming Matches</div> -->
		{/if}
		<AppDrawer
			close={() => (upcomingMatchDrawer = false)}
			open={upcomingMatchDrawer}
			title="Fixtures"
		>
			<AllFixtures fixtures={$event.fixtures} />
		</AppDrawer>
	</Card>
	<Card
		titleDiv={false}
		viewMore={{ placeholder: 'All Scores', onClick: () => (matchScoresDrawer = true) }}
		title="Scores"
	>
		{#if $event.fixtureScores.length}
			<AllScores fixtures={$event.fixtureScores.slice(0, 3)} />
		{:else}
			<div class="text-center py-5">No Matches Played Yet.</div>
		{/if}
		<AppDrawer close={() => (matchScoresDrawer = false)} open={matchScoresDrawer} title="Fixtures">
			<AllScores fixtures={$event.fixtureScores} />
		</AppDrawer>
	</Card>
{/if}
{#if topPlayers.length}
	<Card
		titleDiv={false}
		viewMore={{
			placeholder: 'Full Table',
			herf: '/event/' + $page.params.eventID + '/rank/player'
		}}
		title="Player Rankings"
	>
		<div class="text-base1 hide-scroll-bar mt-5 overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead class="text-xs uppercase">
					<tr class="text-base1 x-7 bg-base1light">
						<th class="w-1 bg-base2" scope="col" />
						<th class="py-1 px-2" scope="col">Pos</th>
						<th class="py-1 px-3" scope="col">Player</th>
						<th class="py-1 px-2" scope="col">M</th>
						<th class="py-1 px-2" scope="col">G</th>
						<th class="py-1 px-2" scope="col">A</th>
						<th class="py-1 px-2" scope="col">Y</th>
						<th class="w-1 bg-base2" scope="col" />
					</tr>
				</thead>
				<tbody>
					{#each topPlayers as player, i}
						<tr class="{topPlayers.length === i + 1 ? '' : 'border-b'} border-base1/50">
							<td class="w-1" />
							<td class="py-2 px-3">{i + 1}</td>
							<th class="py-2 px-3 font-medium text-gray-900 whitespace-nowrap" scope="row">
								<a href="/event/{$page.params.eventID}/profile/player/{player.id}">{player.name}</a>
							</th>
							<td class="py-2 px-2">{player.matchesPlayed ?? 0}</td>
							<td class="py-2 px-2">{player.goals ?? 0}</td>
							<td class="py-2 px-2">{player.assists ?? 0}</td>
							<td class="py-2 px-2">{player.yellowCard ?? 0}</td>
							<td class="w-1" />
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
	<Ads />
{/if}
{#if topTeams.length}
	<Card
		titleDiv={false}
		viewMore={{ placeholder: 'Full Table', herf: '/event/' + $page.params.eventID + '/rank/team' }}
		title="Team Rankings"
	>
		<div class="text-base1 hide-scroll-bar mt-5 overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead class="text-xs uppercase">
					<tr class="text-base1 x-7 bg-base1light">
						<th class="w-1 bg-base2" scope="col" />
						<th class="py-1 px-2" scope="col">Pos</th>
						<th class="py-1 px-3" scope="col">Teams</th>
						<th class="py-1 px-2" scope="col">M</th>
						<th class="py-1 px-2" scope="col">GD</th>
						<th class="py-1 px-2" scope="col">Pts.</th>
						<th class="w-1 bg-base2" scope="col" />
					</tr>
				</thead>
				<tbody>
					{#each topTeams as team, i}
						<tr class="{topTeams.length === i + 1 ? '' : 'border-b'} border-base1/50">
							<td class="w-1" />
							<td class="py-2 px-3">{i + 1}</td>
							<th class="py-2 px-3 font-medium text-gray-900 whitespace-nowrap" scope="row">
								<a href="/event/{$page.params.eventID}/profile/team/{team.id}">{team.name}</a>
							</th>
							<td class="py-2 px-2">{team.matchesPlayed ?? 0}</td>
							<td class="py-2 px-2">{team.goalDifference ?? 0}</td>
							<td class="py-2 px-2">{team.points ?? 0}</td>
							<td class="w-1" />
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
	<Ads />
{/if}
{#if $latestNews.data.length}
	<Card
		viewMore={{ placeholder: 'All News', onClick: () => (latestNewsDrawer = true) }}
		title="Latest News"
	>
		<AllNews loading={$latestNews.loading} allNews={$latestNews.data.slice(0, 2)} />
		<AppDrawer close={() => (latestNewsDrawer = false)} open={latestNewsDrawer} title="News">
			<AllNews
				onNavigateToOtherPage={() => (latestNewsDrawer = false)}
				loading={$latestNews.loading}
				allNews={$latestNews.data}
				seeMore={$latestNews.askedFor === $latestNews.data.length
					? latestNewsListner($page.params.eventID).seeMore
					: undefined}
			/>
		</AppDrawer>
	</Card>
{/if}
{#if $latestVideos.data.length}
	<Card
		viewMore={{ placeholder: 'All Videos', onClick: () => (latestVideosDrawer = true) }}
		title="Latest Videos"
	>
		<AllVideos loading={$latestVideos.loading} allVideos={$latestVideos.data.slice(0, 2)} />
		<AppDrawer close={() => (latestVideosDrawer = false)} open={latestVideosDrawer} title="Videos">
			<AllVideos
				onNavigateToOtherPage={() => (latestVideosDrawer = false)}
				loading={$latestVideos.loading}
				allVideos={$latestVideos.data}
				seeMore={$latestVideos.askedFor === $latestVideos.data.length
					? latestVideosListner($page.params.eventID).seeMore
					: undefined}
			/>
		</AppDrawer>
	</Card>
	<Ads />
{/if}
