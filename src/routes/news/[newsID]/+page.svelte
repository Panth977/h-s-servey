<script lang="ts">
	import { page } from '$app/stores';
	import News from '$lib/News.svelte';
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	// import type { PageData } from './$types';
	// export let data: PageData;
	/** +page.ts
 	import { NewsColl, type News } from '$lib/firebase/db';
	import { doc, getDoc } from 'firebase/firestore';
	import type { PageLoad } from './$types';
	import { error } from '@sveltejs/kit';
	
	export const load: PageLoad<News> = async ({ params }) => {
		try {
			const res = await getDoc(doc(NewsColl, params.newsID));
			const news = res.data();
			if (!news) throw error(404, 'Not found');
			return news;
		} catch (e) {
			throw error(404, 'Not found');
		}
	};
		
	*/
	import { NewsColl } from '$lib/firebase/db';
	import { doc, getDoc } from 'firebase/firestore';

	$: newsID = $page.params.newsID;
</script>

{#await getDoc(doc(NewsColl, newsID)).then( (x) => x.data(), () => null )}
	Loading...
{:then data}
	{#if data}
		<Seo discription={data.caption} poster={data.image} title={data.title} />
		<Header title="Latest News" share={{ path: `/news/${newsID}`, title: data?.title }} />
		<div class="pb-9 mt-1">
			<News news={data} />
		</div>
	{:else}
		Page 404: Not Found
	{/if}
{/await}
<!-- <Seo discription={data.caption} poster={data.image} title={data.title} />
<Header title="Latest News" share={{ path: `/news/${newsID}`, title: data?.title }} />
<div class="pb-9 mt-1">
	<News news={data} />
</div> -->
