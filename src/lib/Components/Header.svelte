<script lang="ts">
	import Back from '$lib/Icon/Back.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import Share, { type ShareInfo } from '$lib/Icon/Share.svelte';

	export let tralingLogo = false;
	export let title: string;
	export let onBack = () => history.back();
	export let share: ShareInfo | undefined = undefined;
</script>

<div class="flex justify-between page-margin">
	<a class="header" style="margin-left: 0px; margin-right: 0px;" href="/">Huddle & Score</a>
	{#if tralingLogo}
		<Logo dark={false} />
	{/if}
</div>
<div class="flex mt-1 justify-between page-margin">
	<button on:click={onBack}><Back /></button>
	<span>{title}</span>
	<span>
		{#if share}
			<Share {share} />
		{/if}
	</span>
</div>
