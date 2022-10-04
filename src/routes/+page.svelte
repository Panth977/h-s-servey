<script lang="ts">
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import '../app.css';
	console.count('home');
	onMount(async function () {
		console.count('home');
		const eventSub = onSnapshot(
			doc(await import('$lib/firebase/firebase').then((x) => x.getFirebase().db), 'Event/001'),
			{
				next(snapshot) {
					try {
						console.log(snapshot.data());
					} catch (err) {
						console.error(err);
					}
				}
			}
		);
		console.count('home');
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
