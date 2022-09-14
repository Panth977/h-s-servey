<script lang="ts">
	import Ads from './Components/Ads.svelte';
	import type { Video } from './firebase/db';
	import { event } from './state';

	export let video: Video;
</script>

<video src={video.video} controls={true} autoPlay={false} class="w-[calc(100%-64px)] mx-8 mt-5">
	<track kind="captions" />
</video>
<div class="px-2 mt-5">
	<p>
		{#each video.content as content}
			{#if content.type === 'team'}
				<a href="/profile/team/{content.teamID}" class="underline">
					#{$event.teams[content.teamID].name}
				</a>
			{:else if content.type === 'player'}
				<a href="/profile/player/{content.playerID}" class="underline">
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
