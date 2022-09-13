<script lang="ts">
	import { videoListner, event } from '$lib/state';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Back from '$lib/Icon/Back.svelte';
	import Ads from '$lib/Components/Ads.svelte';
	import Video from '$lib/Video.svelte';
	$: videoID = $page.params.videoID;

	const videoStore = videoListner.store;
	$: video = videoListner.id === videoID ? $videoStore : null;

	onMount(() => {
		videoListner.id = videoID;
		return () => (videoListner.id = undefined);
	});
</script>

<div class="contrast pb-9 mt-1">
	<div class="flex justify-between mx-8">
		<button on:click={() => history.back()}><Back /></button>
		<span>Latest Video</span>
		<span />
	</div>
	{#if video === undefined}
		Loading...
	{:else if video === null}
		Page 404
	{:else}
		<Video {video} />
	{/if}
</div>
<Ads />
