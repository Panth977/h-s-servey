<script lang="ts">
	import Logo from '$lib/Icon/Logo.svelte';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { getFirebase } from '$lib/firebase/firebase';
	import { auth } from '$lib/state';
	import RegisterAccount from '$lib/Icon/RegisterAccount.svelte';

	let email = '';
	let pass = '';
	let name = '';
	let loading = false;
	let error: any;
	async function register() {
		loading = true;
		auth.update((x) => x || undefined);
		error = undefined;
		try {
			const user = await createUserWithEmailAndPassword(getFirebase().auth, email, pass);
			await updateProfile(user.user, { displayName: name });
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
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Register your account
			</h2>
		</div>
		<form on:submit|preventDefault={register} class="mt-8 space-y-6" action="#" method="POST">
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="register-email-address" class="sr-only">Email address</label>
					<input
						bind:value={email}
						disabled={loading}
						id="register-email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="register-name" class="sr-only">Name</label>
					<input
						bind:value={name}
						disabled={loading}
						id="register-name"
						name="naem"
						type="text"
						autocomplete="name"
						required
						class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Name"
					/>
				</div>
				<div>
					<label for="register-password" class="sr-only">Password</label>
					<input
						bind:value={pass}
						disabled={loading}
						id="register-password"
						name="password"
						type="password"
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="text-sm">
					<a href="#login" class="font-medium text-indigo-600 hover:text-indigo-500">
						Already have an Account
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
						<RegisterAccount />
					</span>

					{#if loading}
						Loading...
					{:else}
						Create An Account
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
