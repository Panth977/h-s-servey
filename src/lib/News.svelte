<script lang="ts">
	import Ads from './Components/Ads.svelte';
	import type { News } from './firebase/db';
	import { event } from './state';

	export let news: News;
	export let onNavigateToOtherPage: VoidFunction;
</script>

<h2 class="mx-8 font-bold text-3xl sm:text-5xl">{news.title}</h2>
<img src={news.image} alt={news.id} class="w-full px-8 mt-5" />
<p class="mx-8 mt-5">
	{#each news.content as content}
		{#if content.type === 'team'}
			<a on:click={onNavigateToOtherPage} href="/profile/team/{content.teamID}" class="underline">
				#{$event.teams[content.teamID].name}
			</a>
		{:else if content.type === 'player'}
			<a
				on:click={onNavigateToOtherPage}
				href="/profile/player/{content.playerID}"
				class="underline"
			>
				@{$event.players[content.playerID].name}
			</a>
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
<Ads />
