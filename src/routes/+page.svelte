<script lang="ts">
	import { parseEventDocument } from '$lib/firebase/db';
	import { eventRef } from '$lib/firebase/event';
	import { onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import '../app.css';
	console.log('home page entered');
	onMount(function () {
		console.count('app/layout');
		const eventSub = onSnapshot(eventRef, {
			next(snapshot) {
				const data = snapshot.data();
				try {
					console.log(snapshot.data());
					console.log(parseEventDocument(data as any));
				} catch (err) {
					console.error(err);
				}
			}
		});
		return function () {
			console.log('sub cancled');
			eventSub();
		};
	});
</script>

Welcome to home page
<br />
{#await new Promise((res) => setTimeout(res, 5000))}
	<button disabled class="-bg-base2 bg-opacity-50 px-2 py-1 w-full mt-3">
		Collecting logs...
	</button>
{:then _}
	<button on:click={() => console.log('hi')} class="-bg-base2 text-base2 px-2 py-1 w-full mt-3">
		👍 Logs Collected 📋
	</button>
{/await}
<a href="/app" class="underline text-danger block text-center">App</a>
