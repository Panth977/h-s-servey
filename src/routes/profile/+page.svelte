<script>
	import Back from '$lib/Icon/Back.svelte';
</script>

<a class="header" href="/">Huddle & Score</a>
<div class="flex mt-1 justify-between mx-8">
	<button on:click={() => history.back()}><Back /></button>
	<span>Select Profile</span>
	<span />
</div>
<a
	href="/profile/team"
	class="w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center flex justify-center bg-base1lighter"
>
	Team
	<br />Profile
</a>
<a
	href="/profile/player"
	class="flex justify-center w-[50%] font-bold text-3xl rounded-lg aspect-square mt-5 mx-[25%] text-start items-center bg-base1lighter"
>
	Player
	<br />Profile
</a>
