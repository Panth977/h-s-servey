<script lang="ts">
	import Logo from '$lib/Icon/Logo.svelte';
	import { sendEmailVerification, signOut } from 'firebase/auth';
	import { getFirebase } from '$lib/firebase/firebase';
	import { auth } from '$lib/state';
	import Send from '$lib/Icon/Send.svelte';

	let loading = false;
	let error: any;
	let sent = false;
	async function logout() {
		if (!confirm('Do you want to log out?')) return;
		auth.set(undefined);
		signOut(getFirebase().auth);
	}
	async function verify() {
		loading = true;
		error = undefined;
		try {
			await sendEmailVerification($auth!);
			sent = true;
		} catch (err) {
			error = err;
		}
		loading = false;
	}
</script>

<div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 mt-3">
		<div>
			<div class="flex justify-center">
				<Logo />
			</div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Verify Email</h2>
		</div>

		<div class="flex items-center justify-between">
			<div>Use Another accounts</div>
			<div class="text-sm">
				<button on:click={logout} href="#login" class="font-medium text-danger border py-2 px-3">
					Log out
				</button>
			</div>
		</div>

		<p class="font-light text-sm">
			Hi <span class="text-base1 font-medium">{$auth?.displayName}</span>, Your Account is not
			Verified Yet. <br /> Send Email Verification link to
			<span class="text-base1 underline underline-offset-2 font-medium">
				{$auth?.email}
			</span>
		</p>
		{#if error}
			<div class="text-danger text-sm">
				{error.code ?? error}
			</div>
		{/if}
		{#if sent}
			<div class="border text-sm font-medium py-2 px-3">
				Email has been sent, Email could be in your spam folder so check!
			</div>
		{/if}
		<button
			disabled={loading}
			on:click={verify}
			class="group bg-base1 disabled:opacity-50 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<span class="absolute inset-y-0 left-0 flex items-center pl-3">
				<!-- Heroicon name: mini/lock-closed -->
				<Send />
			</span>
			{#if loading}
				Loading...
			{:else}
				Send Link
			{/if}
		</button>
	</div>
</div>
