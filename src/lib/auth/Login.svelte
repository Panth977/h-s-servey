<script lang="ts">
	import Logo from '$lib/Icon/Logo.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { getFirebase } from '$lib/firebase/firebase';
	import Secutity from '$lib/Icon/Secutity.svelte';
	import { auth } from '$lib/state';

	let email = '';
	let pass = '';
	let loading = false;
	let error: any;
	async function signIn() {
		loading = true;
		error = undefined;
		auth.update((x) => x || undefined);
		try {
			await signInWithEmailAndPassword(getFirebase().auth, email, pass);
		} catch (err) {
			error = err;
		}
		auth.update((x) => x || null);
		loading = false;
	}
</script>

<div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 mt-3">
		<div>
			<div class="flex justify-center">
				<Logo />
			</div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Log In</h2>
		</div>
		<form on:submit|preventDefault={signIn} class="mt-8 space-y-6" action="#" method="POST">
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="login-email-address" class="sr-only">Email address</label>
					<input
						disabled={loading}
						bind:value={email}
						id="login-email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="login-password" class="sr-only">Password</label>
					<input
						bind:value={pass}
						disabled={loading}
						id="login-password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<!-- <div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
				</div> -->

				<div class="text-sm">
					<a href="#forgot" class="font-medium text-indigo-600 hover:text-indigo-500">
						← Forgot password?
					</a>
				</div>
			</div>
			{#if error}
				<div class="text-danger text-sm">
					{error.code ?? error}
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
						<Secutity />
					</span>

					{#if loading}
						Loading...
					{:else}
						Sign in
					{/if}
				</button>
			</div>
		</form>
		<div class="flex items-center justify-between">
			<!-- <div class="flex items-center">
				<input
					id="remember-me"
					name="remember-me"
					type="checkbox"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
			</div> -->

			<div class="text-sm" />
			<div class="text-sm text-right">
				New to Huddle and Score?
				<br />
				<a
					href="#register"
					class="font-medium underline text-base1 text-indigo-600 hover:text-indigo-500"
				>
					Sign Up
				</a>
			</div>
		</div>
	</div>
</div>
