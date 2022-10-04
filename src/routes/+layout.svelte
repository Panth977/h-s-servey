<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getFirebase } from '$lib/firebase/firebase';
	import { signInAnonymously } from 'firebase/auth';
	import { EventRef, parseEventDocument } from '$lib/firebase/db';
	import { event, latestNewsListner, latestVideosListner } from '$lib/state';
	import { onSnapshot } from 'firebase/firestore';
	import Latest from '$lib/Icon/Latest.svelte';
	import Ranking from '$lib/Icon/Ranking.svelte';
	import Profile from '$lib/Icon/Profile.svelte';
	import Photos from '$lib/Icon/Photos.svelte';
	import type { PageData } from './$types';
	import { subscribeRoutes } from '$lib/Components/Header.svelte';

	export let data: PageData;
	console.log(data);
	if (Object.keys(data).length) {
		event.update((x) => x || parseEventDocument(data.event as any));
		latestNewsListner.addIfNot(data.news);
		latestVideosListner.addIfNot(data.videos);
	}
	onMount(function () {
		subscribeRoutes();
		const eventSub = onSnapshot(EventRef, {
			next(snapshot) {
				event.set(snapshot.data()!);
			}
		});
		latestNewsListner.seeMore();
		latestVideosListner.seeMore();
		signInAnonymously(getFirebase().auth).then(console.log, console.error);
		return function () {
			eventSub();
			latestNewsListner.unSub?.();
			latestVideosListner.unSub?.();
		};
	});
</script>

<div class="app">
	<div class="pb-5">
		{#if $event}
			<slot />
		{:else}
			Loading...
		{/if}
	</div>
	<div class="h-16" />
	<div
		class="h-14 z-50 bg-base2 bg-white border-t items-center flex justify-around fixed bottom-0 screen-width"
	>
		<a href="/"><Latest /></a>
		<a href="/rank"><Ranking /></a>
		<a href="/profile"><Profile /></a>
		<a href="https://www.google.com/" target="_blank"><Photos /></a>
	</div>
</div>
