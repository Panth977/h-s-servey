<script lang="ts">
	import { page } from '$app/stores';
	import { event, selectiveNewsListner, selectiveVideoListner } from '$lib/state';
	import AllNews from '$lib/AllNews.svelte';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import AllVideos from '$lib/AllVideos.svelte';
	import Ads from '$lib/Components/Ads.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import { onMount } from 'svelte';
	import Card from '$lib/Components/Card.svelte';

	$: teamID = $page.params.teamID;
	$: team = $event.teams[teamID];

	let latestNewsDrawer = false;
	let latestVideosDrawer = false;
	const latestNews = selectiveNewsListner.store;
	const latestVideos = selectiveVideoListner.store;

	onMount(function () {
		selectiveNewsListner.connectTo = teamID;
		selectiveVideoListner.connectTo = teamID;
		return function () {
			selectiveNewsListner.connectTo = undefined;
			selectiveVideoListner.connectTo = undefined;
		};
	});

	$: stats = [
		{ title: 'Matches Played', val: team.matchesPlayed },
		{ title: 'Goals Scored', val: team.goalScored },
		{ title: 'Wins', val: team.won },
		{ title: 'Losses', val: team.loss },
		{ title: 'Goals Conceived', val: team.goalConceived },
		{ title: 'Goal Difference', val: team.goalDifference },
		{ title: 'Points', val: team.points }
	].reduce(function (p, c, i) {
		if (i % 2) p[p.length - 1].push(c);
		else p.push([c]);
		return p;
	}, [] as { title: string; val: number }[][]);
</script>

<div>
	<div class="relative">
		<div
			class="w-full text-center"
			style="
                    position: absolute;
                    top: -45px;

                    font-weight: 900;
                    font-size: 214.431px;
                    line-height: 137.4%;
                    
                    background: linear-gradient(129.49deg, rgba(255, 255, 255, 0.28) 0.67%, rgba(0, 255, 28, 0.28) 54.08%, rgba(1, 51, 1, 0.28) 109.66%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                "
		>
			{Number.isNaN(team.score)
				? '00'
				: team.score < 10
				? '0' + team.score.toFixed(0)
				: team.score.toFixed(0)}
		</div>
		<img src={team.logo} alt={team.name} class="mx-auto pt-32 relative z-10 w-[50%]" />
	</div>
	<h2 class="text-xl mt-5 page-margin">Overview</h2>
	<div class="grid grid-cols-3 mt-5 page-margin gap-3">
		{#each [{ title: 'Attack', val: team.attack }, { title: 'Possession', val: team.possession }, { title: 'Defence', val: team.defence }] as { title, val }}
			<div class="rounded-xl bg-base1light p-3">
				<span class="font-medium text-xs block text-base1">{title}</span>
				<span class="font-bold text-4xl text-base1">
					{Number.isNaN(val) ? '--' : val < 10 ? '0' + val.toFixed(0) : val.toFixed(0)}
				</span>
			</div>
		{/each}
	</div>

	<h2 class="text-xl mt-5 page-margin font-bold">Team Chemistry</h2>
	<div class="mt-1 page-margin flex items-center">
		<div class="bg-base2 h-1 w-[35%] rounded-full">
			<div class="bg-danger h-1 rounded-full" style="width: {team.teamChemistry}%;" />
		</div>
		<span class="ml-2">{team.teamChemistry}%</span>
	</div>
</div>
<Card>
	{#each stats as data}
		<div class="flex justify-around mt-2">
			{#each data as stat}
				<div class="rounded-xl bg-base1 text-center w-36 h-24 p-3">
					<span class="font-medium text-xs block">{stat.title}</span>
					<span class="font-bold block mt-3 text-4xl">
						{Number.isNaN(stat.val) ? '--' : stat.val.toFixed(0)}
					</span>
				</div>
			{/each}
		</div>
	{/each}
</Card>
{#if $latestNews.data.length}
	<Card
		title="Latest News"
		viewMore={{ placeholder: 'All News', onClick: () => (latestNewsDrawer = true) }}
	>
		<AllNews loading={$latestNews.loading} allNews={$latestNews.data.slice(0, 2)} />
		<AppDrawer close={() => (latestNewsDrawer = false)} open={latestNewsDrawer} title="News">
			<AllNews
				onNavigateToOtherPage={() => (latestNewsDrawer = false)}
				loading={$latestNews.loading}
				allNews={$latestNews.data}
				seeMore={$latestNews.askedFor === $latestNews.data.length
					? selectiveNewsListner.seeMore
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
					? selectiveVideoListner.seeMore
					: undefined}
			/>
		</AppDrawer>
	</Card>
{/if}
