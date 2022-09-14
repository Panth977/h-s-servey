<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { EventRef } from '$lib/firebase/db';
	import { event, latestNewsListner, latestVideosListner } from '$lib/state';
	import { onSnapshot } from 'firebase/firestore';
	import Latest from '$lib/Icon/Latest.svelte';
	import Ranking from '$lib/Icon/Ranking.svelte';
	import Profile from '$lib/Icon/Profile.svelte';
	import Photos from '$lib/Icon/Photos.svelte';

	onMount(function () {
		const eventSub = onSnapshot(EventRef, {
			next(snapshot) {
				event.set(snapshot.data()!);
			}
		});
		latestNewsListner.seeMore();
		latestVideosListner.seeMore();
		return function () {
			eventSub();
			latestNewsListner.unSub?.();
			latestVideosListner.unSub?.();
		};
	});
</script>

<head>
	<link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
</head>

<div class="app min-h-screen">
	<div class="min-h-[calc(100vh-128px)]">
		<slot />
	</div>
	<div
		class="h-16 mt-5 z-50 bg-base2 bg-white border-t items-center flex justify-around sticky bottom-0 w-full"
	>
		<a href="/"><Latest /></a>
		<a href="/rank"><Ranking /></a>
		<a href="/profile"><Profile /></a>
		<a href="https://www.google.com/" target="_blank"><Photos /></a>
	</div>
</div>
