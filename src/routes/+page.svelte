<script lang="ts">
	import { event, latestNewsListner, latestVideosListner } from '$lib/state';
	import BottomDrawer from '$lib/BottomDrawer.svelte';
	import Ads from '$lib/Ads.svelte';
	import AllFixtures from '../lib/AllFixtures.svelte';
	import LocationPin from '$lib/Icon/LocationPin.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import AllNews from '$lib/AllNews.svelte';
	import AllVideos from '$lib/AllVideos.svelte';

	$: currentFixture =
		$event.fixtures[$event.fixtures.length - $event.upcommingFixtures.length - 1] ??
		$event.fixtures[0];
	let upcomingMatchDrawer = false;
	let latestNewsDrawer = false;
	let latestVideosDrawer = false;
	const latestNews = latestNewsListner.store;
	const latestVideos = latestVideosListner.store;
</script>

<div class="px-8 -mt-1 items-center flex space-x-1">
	<LocationPin />
	<span>Ahmedabad</span>
</div>
{#if currentFixture}
	<div class="flex bg-base2 mt-5 px-8">
		<div
			style="width: 9.81px; background-color: {currentFixture.team1
				.color}; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
		/>
		<div
			class="w-full text-xl items-center flex justify-around pb-4 pt-5"
			style="font-weight: 500;"
		>
			<span>{currentFixture.team1.acronym}</span>
			<img src={currentFixture.team1.logo} alt={currentFixture.team1.name} class="w-9 h-10" />
			<span> {currentFixture.scores?.team1 ?? 0} - {currentFixture.scores?.team2 ?? 0} </span>
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
		<div class="bg-danger mt-3 py-2 h-9">Watch live stream</div>
	</a>
{/if}
<Ads />
{#if $event.fixtures.length}
	<div class="card">
		<div class="bg-base2 py-3">
			<h3 class="text-2xl text-base1 px-8 font-bold flex justify-between">
				<span>AllFixtures</span><Logo />
			</h3>
			{#if $event.upcommingFixtures.length}
				<AllFixtures showMaxDays={1} fixtures={$event.upcommingFixtures.splice(0, 3)} />
			{:else}
				<div class="text-center py-5">No Upcoming Matches</div>
			{/if}
			<BottomDrawer
				close={() => (upcomingMatchDrawer = false)}
				open={upcomingMatchDrawer}
				title="AllFixtures"
			>
				<AllFixtures fixtures={$event.fixtures} />
			</BottomDrawer>
			<button
				class="w-full text-base1 border-base1/50 border-t-2 mt-2"
				style="font-weight: 500;"
				on:click={() => (upcomingMatchDrawer = true)}
			>
				View All
			</button>
		</div>
	</div>
{/if}
{#if $event.sortedPlayers.length}
	<div class="card">
		<div class="bg-base2 py-3">
			<h3 class="text-2xl text-base1 px-8 font-bold flex justify-between">
				<span>Player Rankings</span><Logo />
			</h3>
			<div class="text-base1 hide-scroll-bar mt-5 overflow-x-auto">
				<table class="w-full text-sm text-left">
					<thead class="text-xs uppercase">
						<tr class="text-base1 x-7 bg-base1light">
							<th class="w-7 bg-base2" scope="col" />
							<th class="py-1 px-2" scope="col">Pos</th>
							<th class="py-1 px-3" scope="col">Player</th>
							<th class="py-1 px-2" scope="col">M</th>
							<th class="py-1 px-2" scope="col">G</th>
							<th class="py-1 px-2" scope="col">A</th>
							<th class="py-1 px-2" scope="col">Y</th>
							<th class="w-7 bg-base2" scope="col" />
						</tr>
					</thead>
					<tbody>
						{#each $event.sortedPlayers.slice(0, 3) as player, i}
							<tr class="border-b border-base1/50">
								<td class="w-7" />
								<td class="py-2 px-3">{i + 1}</td>
								<th class="py-2 px-3 font-medium text-gray-900 whitespace-nowrap" scope="row">
									<a href="/profile/player/{player.id}">{player.name}</a>
								</th>
								<td class="py-2 px-2">{player.matchesPlayed ?? 0}</td>
								<td class="py-2 px-2">{player.goals ?? 0}</td>
								<td class="py-2 px-2">{player.assists ?? 0}</td>
								<td class="py-2 px-2">{player.yellowCard ?? 0}</td>
								<td class="w-7" />
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<a
				class="block w-full -mb-2 text-center text-base1"
				style="font-weight: 500;"
				href="/rank/player"
			>
				View All
			</a>
		</div>
	</div>
{/if}
<Ads />
{#if $event.sortedTeams.length}
	<div class="card">
		<div class="bg-base2 py-3">
			<h3 class="text-2xl text-base1 px-8 font-bold flex justify-between">
				<span>Team Rankings</span><Logo />
			</h3>
			<div class="text-base1 hide-scroll-bar mt-5 overflow-x-auto">
				<table class="w-full text-sm text-left">
					<thead class="text-xs uppercase">
						<tr class="text-base1 x-7 bg-base1light">
							<th class="w-7 bg-base2" scope="col" />
							<th class="py-1 px-2" scope="col">Pos</th>
							<th class="py-1 px-3" scope="col">Teams</th>
							<th class="py-1 px-2" scope="col">M</th>
							<th class="py-1 px-2" scope="col">GD</th>
							<th class="py-1 px-2" scope="col">Pts.</th>
							<th class="w-7 bg-base2" scope="col" />
						</tr>
					</thead>
					<tbody>
						{#each $event.sortedTeams.slice(0, 3) as team, i}
							<tr class="border-b border-base1/50">
								<td class="w-7" />
								<td class="py-2 px-3">{i + 1}</td>
								<th class="py-2 px-3 font-medium text-gray-900 whitespace-nowrap" scope="row">
									<a href="/profile/team/{team.id}">{team.name}</a>
								</th>
								<td class="py-2 px-2">{team.matchesPlayed ?? 0}</td>
								<td class="py-2 px-2">{team.goalDifference ?? 0}</td>
								<td class="py-2 px-2">{team.points ?? 0}</td>
								<td class="w-7" />
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<a
				class="block w-full -mb-2 text-center text-base1"
				style="font-weight: 500;"
				href="/rank/team"
			>
				View All
			</a>
		</div>
	</div>
{/if}
<Ads />
{#if $latestNews.data.length}
	<div class="card">
		<div class="bg-base2 py-3">
			<h3 class="text-2xl text-base1 px-8 font-bold flex justify-between">
				<span>Latest News</span><Logo />
			</h3>
			<AllNews loading={$latestNews.loading} allNews={$latestNews.data.slice(0, 2)} />
			<BottomDrawer close={() => (latestNewsDrawer = false)} open={latestNewsDrawer} title="News">
				<AllNews
					loading={$latestNews.loading}
					allNews={$latestNews.data}
					seeMore={$latestNews.askedFor === $latestNews.data.length
						? latestNewsListner.seeMore
						: undefined}
				/>
			</BottomDrawer>
			<button
				class="w-full text-base1 border-base1/50 border-t-2 mt-2"
				style="font-weight: 500;"
				on:click={() => (latestNewsDrawer = true)}
			>
				View All
			</button>
		</div>
	</div>
{/if}
{#if $latestVideos.data.length}
	<div class="card">
		<div class="bg-base2 py-3">
			<h3 class="text-2xl text-base1 px-8 font-bold flex justify-between">
				<span>Latest Videos</span><Logo />
			</h3>
			<AllVideos loading={$latestVideos.loading} allVideos={$latestVideos.data.slice(0, 2)} />
			<BottomDrawer
				close={() => (latestVideosDrawer = false)}
				open={latestVideosDrawer}
				title="Videos"
			>
				<AllVideos
					loading={$latestVideos.loading}
					allVideos={$latestVideos.data}
					seeMore={$latestVideos.askedFor === $latestVideos.data.length
						? latestVideosListner.seeMore
						: undefined}
				/>
			</BottomDrawer>
			<button
				class="w-full text-base1 border-base1/50 border-t-2 mt-2"
				style="font-weight: 500;"
				on:click={() => (latestVideosDrawer = true)}
			>
				View All
			</button>
		</div>
	</div>
{/if}
<Ads />
