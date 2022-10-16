<script context="module" lang="ts">
	export interface ShareInfo {
		path: string;
		title?: string;
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Send from '$lib/Icon/Send.svelte';
	export let share: ShareInfo;
	$: url = $page.url;
	function shareUrl() {
		if (!navigator.share) return;
		navigator.share({
			url: `${url.origin}${share?.path}`,
			title: share.title
		});
	}
</script>

<button on:click={shareUrl}>
	<Send />
</button>
