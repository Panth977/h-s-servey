<script lang="ts">
	import { page } from '$app/stores';
	import News from '$lib/News.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { onMount } from 'svelte';
	import { doc, getDoc } from 'firebase/firestore';
	import { NewsColl, type News as NewsType } from '$lib/firebase/db';
	import type { PageData } from './$types';

	export let data: PageData;
	let news: NewsType | undefined | null = Object.keys(data).length ? data : undefined;
	onMount(async function () {
		if (news) return;
		news = await getDoc(doc(NewsColl($page.params.eventID), $page.params.newsID)).then(
			(x) => x.data() ?? null,
			() => null
		);
	});
</script>

{#if news}
	<Seo discription={news.caption} poster={news.image} title={news.title} />
	<Header
		title="Latest News"
		share={{ path: `/news/${$page.params.newsID}`, title: news?.title }}
	/>
	<div class="pb-9 mt-1">
		<News {news} />
	</div>
{:else if news === undefined}
	Loading...
{:else}
	Page 404: Not Found
{/if}
