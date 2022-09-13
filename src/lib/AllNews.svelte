<script lang="ts">
	import type { News } from '$lib/firebase/db';
	import { event } from '$lib/state';
	import BottomDrawer from './BottomDrawer.svelte';
	import NewsComponent from './News.svelte';
	import Skeleton from './Skeleton.svelte';
	export let allNews: News[];
	export let loading: boolean;
	export let seeMore: VoidFunction | undefined = undefined;
	export let selectedNews: News | undefined = undefined;
</script>

<BottomDrawer
	placement="right"
	open={selectedNews !== undefined}
	close={() => (selectedNews = undefined)}
	title="Latest News"
>
	{#if selectedNews}
		<NewsComponent news={selectedNews} />
	{/if}
</BottomDrawer>

{#each allNews as news}
	<button
		class="pt-3 mx-8 h-20 overflow-hidden flex items-start"
		on:click={() => (selectedNews = news)}
	>
		<img alt={news.id} class="object-cover w-24 h-20 pt-2" src={news.image} />
		<div class="px-2">
			<p>
				{#each news.content as content}
					{#if content.type === 'team'}
						<span class="text-base1">
							#{$event.teams[content.teamID].name}
						</span>
					{:else if content.type === 'player'}
						<span class="text-base1">
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
