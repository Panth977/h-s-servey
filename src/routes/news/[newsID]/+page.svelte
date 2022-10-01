<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import News from '$lib/News.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	$: newsID = $page.params.newsID;
	export let data: PageData;
</script>

<Seo discription={data.caption} poster={data.image} title={data.title} />
<Header title="Latest News" share={{ path: `/news/${newsID}`, title: data?.title }} />
<div class="pb-9 mt-1">
	<News news={data} />
</div>
