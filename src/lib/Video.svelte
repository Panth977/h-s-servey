<script lang="ts">
	import Ads from './Components/Ads.svelte';
	import type { Video } from './firebase/db';
	import { event } from './state';

	export let video: Video;
	export let onNavigateToOtherPage: VoidFunction;
</script>

<h2 class="mx-8 font-bold text-3xl sm:text-5xl">{video.title}</h2>
<video src={video.video} controls={true} autoPlay={false} class="w-full px-8 mt-5">
	<track kind="captions" />
</video>
<p class="mx-8 mt-5">
	{#each video.content as content}
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
