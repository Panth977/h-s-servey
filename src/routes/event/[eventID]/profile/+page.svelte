<script>
	import Header from '$lib/Components/Header.svelte';
	import Seo from '$lib/Components/Seo.svelte';
	import { page } from '$app/stores';
</script>

<Seo />
<Header tralingLogo title="Select Profile" />
<a
	href="/event/{$page.params.eventID}/profile/team"
	class="w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center flex justify-center bg-base1lighter"
>
	Team
	<br />Profile
</a>
<a
	href="/event/{$page.params.eventID}/profile/player"
	class="flex justify-center w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center bg-base1lighter"
>
	Player
	<br />Profile
</a>
