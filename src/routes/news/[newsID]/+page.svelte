<script lang="ts">
	import { newsListner, event } from '$lib/state';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Back from '$lib/Icon/Back.svelte';
	import Ads from '$lib/Components/Ads.svelte';
	import News from '$lib/News.svelte';
	$: newsID = $page.params.newsID;

	const newsStore = newsListner.store;
	$: news = newsListner.id === newsID ? $newsStore : null;

	onMount(() => {
		newsListner.id = newsID;
		return () => (newsListner.id = undefined);
	});
</script>

<a class="header" href="/">Huddle & Score</a>
<div class="contrast pb-9 mt-1">
	<div class="flex justify-between page-margin">
		<button on:click={() => history.back()}><Back /></button>
		<span>Latest News</span>
		<span />
	</div>
	{#if news === undefined}
		Loading...
	{:else if news === null}
		Page 404
	{:else}
		<News {news} />
	{/if}
</div>
<Ads />
