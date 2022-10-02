<script lang="ts">
	import { page } from '$app/stores';
	import Video from '$lib/Video.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	/* +page.ts
	import { VideoColl, type Video } from '$lib/firebase/db';
	import { doc, getDoc } from 'firebase/firestore';
	import type { PageLoad } from './$types';
	import { error } from '@sveltejs/kit';

	export const load: PageLoad<Video> = async ({ params }) => {
		try {
			const res = await getDoc(doc(VideoColl, params.videoID));
			const video = res.data();
			if (!video) throw error(404, 'Not found');
			return video;
		} catch (e) {
			throw error(404, 'Not found');
		}
	};

	*/
	import { VideoColl } from '$lib/firebase/db';
	import { doc, getDoc } from 'firebase/firestore';
	$: videoID = $page.params.videoID;
</script>

{#await getDoc(doc(VideoColl, videoID)).then( (x) => x.data(), () => null )}
	Loading...
{:then data}
	{#if data}
		<Seo discription={data.caption} poster={data.video} title={data.title} />
		<Header title="Latest Video" share={{ path: `/videos/${videoID}`, title: data?.title }} />
		<div class="pb-9 mt-1">
			<Video video={data} />
		</div>
	{:else}
		Page 404: Not Found
	{/if}
{/await}
<!-- <Seo discription={data.caption} poster={data.video} title={data.title} />
<Header title="Latest Video" share={{ path: `/videos/${videoID}`, title: data?.title }} />
<div class="pb-9 mt-1">
	<Video video={data} />
</div> -->
