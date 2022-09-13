<script lang="ts">
	import type { Video } from '$lib/firebase/db';
	import { event } from '$lib/state';
	import AppDrawer from './AppDrawer.svelte';
	import VideoComponent from './Video.svelte';
	import Skeleton from './Skeleton.svelte';
	export let allVideos: Video[];
	export let loading: boolean;
	export let seeMore: VoidFunction | undefined = undefined;
	export let selectedVideo: Video | undefined = undefined;
</script>

<AppDrawer
	placement="right"
	open={selectedVideo !== undefined}
	close={() => (selectedVideo = undefined)}
	title="Latest Video"
>
	{#if selectedVideo}
		<VideoComponent video={selectedVideo} />
	{/if}
</AppDrawer>

{#each allVideos as video}
	<button
		on:click={() => (selectedVideo = video)}
		class="pt-3 mx-8 h-20 overflow-hidden flex items-start"
	>
		<video src={video.video} controls={false} autoPlay={false} class="object-cover w-24 h-20 pt-2">
			<track kind="captions" />
		</video>
		<div class="px-2">
			<p>
				{#each video.content as content}
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
