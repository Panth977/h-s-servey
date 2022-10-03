<script lang="ts">
	import { page } from '$app/stores';
	import Video from '$lib/Video.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: videoID = $page.params.videoID;
</script>

<Seo discription={data.caption} poster={data.video} title={data.title} />
<Header title="Latest Video" share={{ path: `/videos/${videoID}`, title: data?.title }} />
<div class="pb-9 mt-1">
	<Video video={data} />
</div>
