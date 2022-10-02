<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getFirebase } from '$lib/firebase/firebase';
	import { signInAnonymously } from 'firebase/auth';
	import { EventRef } from '$lib/firebase/db';
	import { event, latestNewsListner, latestVideosListner } from '$lib/state';
	import { onSnapshot } from 'firebase/firestore';
	import Latest from '$lib/Icon/Latest.svelte';
	import Ranking from '$lib/Icon/Ranking.svelte';
	import Profile from '$lib/Icon/Profile.svelte';
	import Photos from '$lib/Icon/Photos.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	event.update((x) => x || data);

	onMount(function () {
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
	{#if $event}
		<div class="pb-5">
			<slot />
		</div>
	{/if}
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
