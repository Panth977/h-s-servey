<script lang="ts">
	import { page } from '$app/stores';
	export let title = 'Huddle & Score';
	export let discription =
		'We are an all-in-one package deal for our customers. We offer bookings of turfs, for you and your friends. We also take care of your need to participate in tournaments and so, we offer bookings for both physical and online tournaments.';
	export let url = $page.url.href;
	export let poster: string | undefined = undefined;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={discription} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={discription} />
	{#if poster}
		<meta property="og:image" content={poster} />
	{/if}
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={discription} />
	{#if poster}
		<meta property="twitter:image" content={poster} />
	{/if}
</svelte:head>
