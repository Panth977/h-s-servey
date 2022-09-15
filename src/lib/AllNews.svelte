<script lang="ts">
	import type { News } from '$lib/firebase/db';
	import { event } from '$lib/state';
	import AppDrawer from './Components/AppDrawer.svelte';
	import NewsComponent from './News.svelte';
	import Skeleton from './Components/Skeleton.svelte';
	export let allNews: News[];
	export let loading: boolean;
	export let seeMore: VoidFunction | undefined = undefined;
	export let selectedNews: News | undefined = undefined;
	export let onNavigateToOtherPage: VoidFunction | undefined = undefined;
</script>

<AppDrawer
	bg="base1"
	placement="right"
	open={selectedNews !== undefined}
	close={() => (selectedNews = undefined)}
	title="Latest News"
>
	{#if selectedNews}
		<NewsComponent
			onNavigateToOtherPage={() => {
				selectedNews = undefined;
				onNavigateToOtherPage?.();
			}}
			news={selectedNews}
		/>
	{/if}
</AppDrawer>

{#each allNews as news}
	<button
		class="pt-3 px-8 h-20 overflow-hidden flex items-start w-full"
		on:click={() => (selectedNews = news)}
	>
		<img alt={news.id} class="object-cover w-[30%] h-20 pt-2" src={news.image} />
		<div class="ml-2 text-start text-base1">
			<h4 class="text-sm font-[400]">{news.title}</h4>
			<p class="font-bold">
				{#each news.content as content}
					{#if content.type === 'team'}
						<span class="underline">
							#{$event.teams[content.teamID].name}
						</span>
					{:else if content.type === 'player'}
						<span class="underline">
							@{$event.players[content.playerID].name}
						</span>
					{:else}
						{#each content.text as text}
							{#if text === null}
								<br />
							{:else}
								<span>{text}</span>
							{/if}
						{/each}
					{/if}
				{/each}
			</p>
		</div>
	</button>
{/each}
{#if loading}
	<Skeleton />
{:else if seeMore}
	<button
		on:click={seeMore}
		class="border-y border-dashed rounded-lg border-base1/50 text-center w-full mt-5"
	>
		See More
	</button>
{/if}
