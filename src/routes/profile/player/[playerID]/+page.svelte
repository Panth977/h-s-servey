<script lang="ts">
	import { page } from '$app/stores';
	import { event, selectiveNewsListner, selectiveVideoListner } from '$lib/state';
	import Instagram from '$lib/Icon/Instagram.svelte';
	import { onMount } from 'svelte';
	import AllNews from '$lib/AllNews.svelte';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import AllVideos from '$lib/AllVideos.svelte';
	import Ads from '$lib/Components/Ads.svelte';
	import Card from '$lib/Components/Card.svelte';
	$: playerID = $page.params.playerID;
	$: player = $event.players[playerID];

	onMount(function () {
		selectiveNewsListner.connectTo = playerID;
		selectiveVideoListner.connectTo = playerID;
		return function () {
			selectiveNewsListner.connectTo = undefined;
			selectiveVideoListner.connectTo = undefined;
		};
	});

	let latestNewsDrawer = false;
	let latestVideosDrawer = false;
	const latestNews = selectiveNewsListner.store;
	const latestVideos = selectiveVideoListner.store;

	$: stats = [
		{ title: 'Matches Played', val: player.matchesPlayed },
		{ title: 'Goals Scored', val: player.goals },
		{ title: 'Assists', val: player.assists },
		{ title: 'Yellow Card', val: player.yellowCard },
		{ title: 'Red Card', val: player.redCard }
	].reduce(function (p, c, i) {
		if (i % 2) p[p.length - 1].push(c);
		else p.push([c]);
		return p;
	}, [] as { title: string; val: number }[][]);
</script>

<div class="relative w-[320px] mx-auto">
	<div
		style="
            position: absolute;
            width: 263px;
            height: 301px;
            left: 11px;
            top: 10px;

            font-style: normal;
            font-weight: 900;
            font-size: 219.28px;
            line-height: 301px;

            background: linear-gradient(129.49deg, rgba(255, 255, 255, 0.28) 0.67%, rgba(0, 255, 28, 0.28) 54.08%, rgba(1, 51, 1, 0.28) 109.66%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        "
	>
		{Number.isNaN(player.score)
			? '00'
			: player.score < 10
			? '0' + player.score.toFixed(0)
			: player.score.toFixed(0)}
	</div>
	<div
		class="relative z-10 overflow-hidden bg-scroll bg-no-repeat w-full"
		style="
                background-image: url({player.displayImage});
                background-size: contain;
                height: 300px;
                background-position: 123px top;
            "
	>
		<div
			class="w-full h-full"
			style="
                background-image : linear-gradient(to bottom,  rgba(40, 73, 40, 0),  rgba(40, 73, 40, 1));
            "
		/>
	</div>
</div>
<div class="page-margin overflow-hidden flex justify-between">
	<div>
		<h2 class="font-bold text-5xl">{player.name}</h2>
		<a href="/profile/team/{player.teamID}" class="font-thin whitespace-nowrap text-xl">
			{player.team.name}
		</a>
	</div>
	<a href="/profile/team/{player.teamID}" class="-translate-x-5">
		<img src={player.team.logo} alt={player.team.name} class="w-24 ml-5" />
	</a>
</div>
<h2 class="text-xl mt-5 page-margin">Overview</h2>
<div class="grid grid-cols-3 mt-5 page-margin gap-3">
	{#each [{ title: 'Attack', val: player.attack }, { title: 'Possession', val: player.possession }, { title: 'Defence', val: player.defence }] as { title, val }}
		<div class="rounded-xl bg-base1light p-3">
			<span class="font-medium text-xs block text-base1">{title}</span>
			<span class="font-bold text-4xl text-base1">
				{Number.isNaN(val) ? '--' : val < 10 ? '0' + val.toFixed(0) : val.toFixed(0)}
			</span>
		</div>
	{/each}
</div>

<a
	href="https://www.instagram.com/{player.instagramUsername}/"
	target="_blank"
	class="m-8 bg-base1light py-2 whitespace-nowrap font-bold rounded-lg flex justify-center items-center"
>
	<span>Follow on Instagram</span>
	<span class="ml-2"><Instagram /></span>
</a>
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
<Ads />
