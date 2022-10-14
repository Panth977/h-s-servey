<script lang="ts">
	import { onMount } from 'svelte';
	import { EventColl, parseEventDocument } from '$lib/firebase/db';
	import { eventStore, latestNewsListner, latestVideosListner } from '$lib/state';
	import { doc, onSnapshot } from 'firebase/firestore';
	import Latest from '$lib/Icon/Latest.svelte';
	import Ranking from '$lib/Icon/Ranking.svelte';
	import Profile from '$lib/Icon/Profile.svelte';
	// import Photos from '$lib/Icon/Photos.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	$: event = eventStore($page.params.eventID);

	export let data: PageData;
	$: {
		if (Object.keys(data).length && event && $page.params.eventID) {
			event.update((x) => x || parseEventDocument(data.event as any));
			latestNewsListner($page.params.eventID).addIfNot(data.news);
			latestVideosListner($page.params.eventID).addIfNot(data.videos);
		}
	}

	onMount(function () {
		const eventSub = onSnapshot(doc(EventColl, $page.params.eventID), {
			next(snapshot) {
				event.set(snapshot.data()!);
			}
		});
		latestNewsListner($page.params.eventID).seeMore();
		latestVideosListner($page.params.eventID).seeMore();
		return function () {
			eventSub();
			latestNewsListner($page.params.eventID).unSub?.();
			latestVideosListner($page.params.eventID).unSub?.();
		};
	});
</script>

{#if $page.params.eventID}
	<div class="pb-5">
		{#if $event}
			<slot />
		{:else}
			Loading...
		{/if}
	</div>
	<div class="h-14" />
	<div
		class="h-14 z-50 bg-base2 bg-white border-t items-center flex justify-around fixed bottom-0 screen-width"
	>
		<a href="/event/{$page.params.eventID}"><Latest /></a>
		<a href="/event/{$page.params.eventID}/rank"><Ranking /></a>
		<a href="/event/{$page.params.eventID}/profile"><Profile /></a>
		<!-- <a href="https://www.google.com/" target="_blank"><Photos /></a> -->
	</div>
{/if}
