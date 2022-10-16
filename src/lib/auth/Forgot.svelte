<script lang="ts">
	import Logo from '$lib/Icon/Logo.svelte';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { getFirebase } from '$lib/firebase/firebase';
	import ForgotPass from '$lib/Icon/ForgotPass.svelte';

	let email = '';
	let loading = false;
	let sent = false;
	let error: any;
	async function forgot() {
		loading = true;
		error = undefined;
		sent = false;
		try {
			await sendPasswordResetEmail(getFirebase().auth, email);
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
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Forgot Password
			</h2>
		</div>
		<form on:submit|preventDefault={forgot} class="mt-8 space-y-6" action="#" method="POST">
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="forgot-email-address" class="sr-only">Email address</label>
					<input
						bind:value={email}
						disabled={loading}
						id="forgot-email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div />
				<div class="text-sm">
					<a
						href="#login"
						class="font-medium underline text-base1 text-indigo-600 hover:text-indigo-500"
					>
						Log in →
					</a>
				</div>
			</div>

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
			<div>
				<button
					disabled={loading}
					type="submit"
					class="group bg-base1 disabled:opacity-50 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<!-- Heroicon name: mini/lock-closed -->
						<ForgotPass />
					</span>
					{#if loading}
						Loading...
					{:else}
						Send Email
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
