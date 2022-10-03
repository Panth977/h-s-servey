<script lang="ts">
	import { page } from '$app/stores';
	import News from '$lib/News.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	$: newsID = $page.params.newsID;
</script>

<Seo discription={data.caption} poster={data.image} title={data.title} />
<Header title="Latest News" share={{ path: `/news/${newsID}`, title: data?.title }} />
<div class="pb-9 mt-1">
	<News news={data} />
</div>
