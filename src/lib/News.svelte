<script lang="ts">
	import Ads from './Components/Ads.svelte';
	import type { News } from './firebase/db';
	import { event } from './state';

	export let news: News;
</script>

<img src={news.image} alt={news.id} class="w-[calc(100%-64px)] mx-8 mt-5" />
<div class="px-2 mt-5">
	<p>
		{#each news.content as content}
			{#if content.type === 'team'}
				<a href="profile/teams/{content.teamID}" class="underline">
					#{$event.teams[content.teamID].name}
				</a>
			{:else if content.type === 'player'}
				<a href="profile/players/{content.playerID}" class="underline">
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
</div>
<Ads />
