<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let lastPagesViewed: string[] = [];
	export function subscribeRoutes() {
		page.subscribe((x) => {
			const path = x?.url?.pathname;
			if (!path) return;
			if (path === '/') {
				lastPagesViewed = [];
				return;
			}
			const lastPath = lastPagesViewed.pop();
			if (path === lastPath) lastPagesViewed.push(path);
			else if (lastPath) lastPagesViewed.push(lastPath, path);
			else lastPagesViewed.push(path);
		});
	}
	function goBack() {
		lastPagesViewed.pop();
		const path = lastPagesViewed.pop();
		goto(path ?? '/');
	}
</script>

<script lang="ts">
	import Back from '$lib/Icon/Back.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import Share, { type ShareInfo } from '$lib/Icon/Share.svelte';

	export let tralingLogo = false;
	export let title: string | undefined = undefined;
	export let share: ShareInfo | undefined = undefined;
	export let onBack = goBack;
</script>

<div class="flex justify-between page-margin">
	<a
		class="header"
		style="margin-left: 0px; margin-right: 0px;"
		href="/{$page.params.eventID ? 'event/' + $page.params.eventID : ''}"
	>
		Huddle & Score
	</a>
	{#if tralingLogo}
		<Logo dark={false} />
	{/if}
</div>
{#if title}
	<div class="flex mt-1 justify-between page-margin">
		<button on:click={onBack} class="w-full"><Back /></button>
		<span class="whitespace-nowrap">{title}</span>
		<span class="w-full flex justify-end">
			{#if share}
				<Share {share} />
			{/if}
		</span>
	</div>
{/if}
