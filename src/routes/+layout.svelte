<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getFirebase } from '$lib/firebase/firebase';
	import { parseConfigDocument } from '$lib/firebase/event';
	import { signInAnonymously } from 'firebase/auth';
	import { subscribeRoutes } from '$lib/Components/Header.svelte';
	import type { PageData } from './$types';
	import { config } from '$lib/state';

	export let data: PageData;
	config.update((x) => x || parseConfigDocument(data));
	onMount(function () {
		subscribeRoutes();
		signInAnonymously(getFirebase().auth).then(console.log, console.error);
	});
</script>

<div class="app">
	<slot />
</div>
