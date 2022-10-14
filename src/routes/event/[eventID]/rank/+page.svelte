<script>
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';

	import { page } from '$app/stores';
</script>

<Seo />
<Header tralingLogo title="Select Ranking" />
<a
	href="/event/{$page.params.eventID}/rank/team"
	class="w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center flex justify-center bg-base1lighter"
>
	Team
	<br />Ranking
</a>
<a
	href="/event/{$page.params.eventID}/rank/player"
	class="flex justify-center w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center bg-base1lighter"
>
	Player
	<br />Ranking
</a>
