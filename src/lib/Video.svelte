<script lang="ts">
	import Ads from './Components/Ads.svelte';
	import type { Video } from './firebase/db';
	import { eventStore } from './state';
	import { page } from '$app/stores';
	$: event = eventStore($page.params.eventID);

	export let video: Video;
	export let onNavigateToOtherPage: VoidFunction | undefined = undefined;
</script>

<h2 class="page-margin font-bold text-3xl sm:text-5xl">{video.title}</h2>
<video src={video.video} controls={true} autoPlay={false} class="w-full page-padding mt-5">
	<track kind="captions" />
</video>
<p class="page-margin mt-5">
	{#each video.content as content}
		{#if content.type === 'team'}
			<a
				on:click={onNavigateToOtherPage}
				href="/event/{$page.params.eventID}/profile/team/{content.teamID}"
				class="underline"
			>
				#{$event.teams[content.teamID].name}
			</a>
		{:else if content.type === 'player'}
			<a
				on:click={onNavigateToOtherPage}
				href="/event/{$page.params.eventID}/profile/player/{content.playerID}"
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
