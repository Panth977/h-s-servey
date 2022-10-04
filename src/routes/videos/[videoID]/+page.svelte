<script lang="ts">
	import { page } from '$app/stores';
	import Video from '$lib/Video.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { onMount } from 'svelte';
	import { doc, getDoc } from 'firebase/firestore';
	import { VideoColl, type Video as VideoType } from '$lib/firebase/db';
	import type { PageData } from './$types';

	export let data: PageData;
	let video: VideoType | undefined | null = Object.keys(data).length ? data : undefined;
	$: videoID = $page.params.videoID;
	onMount(async function () {
		if (video) return;
		video = await getDoc(doc(VideoColl, videoID)).then(
			(x) => x.data() ?? null,
			() => null
		);
	});
</script>

{#if video}
	<Seo discription={video.caption} poster={video.video} title={video.title} />
	<Header title="Latest Video" share={{ path: `/videos/${videoID}`, title: video?.title }} />
	<div class="pb-9 mt-1">
		<Video {video} />
	</div>
{:else if video === undefined}
	Loading...
{:else}
	Page 404: Not Found
{/if}
