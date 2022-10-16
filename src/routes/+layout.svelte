<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getFirebase } from '$lib/firebase/firebase';
	import { parseConfigDocument } from '$lib/firebase/event';
	import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
	import { subscribeRoutes } from '$lib/Components/Header.svelte';
	import type { PageData } from './$types';
	import { config, auth } from '$lib/state';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import Login from '$lib/auth/Login.svelte';
	import Register from '$lib/auth/Register.svelte';
	import Forgot from '$lib/auth/Forgot.svelte';
	import SignIn from '$lib/auth/SignIn.svelte';
	import Verify from '$lib/auth/Verify.svelte';
	import Account from '$lib/auth/Account.svelte';

	export let data: PageData;
	config.update((x) => x || parseConfigDocument(data));
	onMount(function () {
		const firebase = getFirebase();
		subscribeRoutes();
		let isFirst = true;
		const unsubAuth = onAuthStateChanged(firebase.auth, function (user) {
			if (isFirst) {
				isFirst = false;
				if ((user?.isAnonymous ?? true) == true) {
					signInAnonymously(firebase.auth).then(console.log, console.error);
				}
			}
			auth.update((x) => {
				if ((x && !user) || (!x && user)) {
					open = false;
				}
				return user;
			});
		});
		return unsubAuth;
	});
	$: console.log();
	var loading = false;
	var open = false;
</script>

<div class="app">
	<div class="flex justify-end">
		{#if $auth === undefined || loading}
			<button disabled> Loading... </button>
		{:else if $auth == null || $auth.isAnonymous}
			<AppDrawer bg="base2" close={() => (open = false)} {open} title="Sign in">
				<!-- Sign In -->
				<SignIn />
			</AppDrawer>
			<button on:click={() => (open = true)}> Sign In </button>
		{:else if !$auth.emailVerified}
			<AppDrawer bg="base2" close={() => (open = false)} {open} title="Verify Email">
				<!-- Verify Email -->
				<Verify />
			</AppDrawer>
			<button on:click={() => (open = true)}> Verify! </button>
		{:else}
			<AppDrawer bg="base2" close={() => (open = false)} {open} title="Account">
				<!-- Account -->
				<Account />
			</AppDrawer>
			<button on:click={() => (open = true)}>
				Hi <span class="text-base1 underline">{$auth.displayName}</span>
			</button>
		{/if}
	</div>
	<div class="mt-2">
		<slot />
	</div>
</div>

<style>
	button {
		@apply bg-base2 mt-2 mr-2 -text-base2 py-2 px-3 rounded-lg;
	}
</style>
