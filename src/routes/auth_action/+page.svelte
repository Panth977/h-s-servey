<script lang="ts">
	import { checkActionCode, applyActionCode, confirmPasswordReset } from 'firebase/auth';
	import { getFirebase } from '$lib/firebase/firebase';
	import { auth as user } from '$lib/state';
	import { onMount } from 'svelte';
	import Json from '$lib/Components/Json.svelte';
	import Secutity from '$lib/Icon/Secutity.svelte';
	import Logo from '$lib/Icon/Logo.svelte';
	import Card from '$lib/Components/Card.svelte';
	function getParameterByName(name: string, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	/* verifyEmail ||  resetPassword */
	let mode = 'None';
	let loading = true;
	let oobCode = '';
	let wrongProject = false;
	let emailVerified = false;
	let error: any;
	let forEmail = '';
	onMount(async function () {
		const auth = getFirebase().auth;
		const apikey = getParameterByName('apiKey');
		if (auth.app.options.apiKey !== apikey) return (wrongProject = true);
		const m = getParameterByName('mode');
		if (m) mode = m;
		const code = getParameterByName('oobCode');
		if (code) {
			error = await checkActionCode(auth, code).then(
				(x) => {
					forEmail = x.data.email ?? '<Unknown>';
				},
				(e) => e
			);
			oobCode = code;
			if (!error) {
				if (mode === 'verifyEmail') {
					error = await applyActionCode(auth, oobCode).then(
						() => undefined,
						(e) => e
					);
					if (!error) {
						emailVerified = true;
						$user?.reload();
					}
				}
			}
		}
		loading = false;
	});
	let newPass = '';
	let passErr: any;
	let passLoading = false;
	let passwordResetSuccess = false;
	async function reset() {
		const auth = getFirebase().auth;
		passLoading = true;
		passErr = undefined;
		try {
			await confirmPasswordReset(auth, oobCode, newPass);
			passwordResetSuccess = true;
		} catch (err) {
			passErr = err;
		}
		passLoading = false;
	}
</script>

<a
	class="underline page-margin text-lg italic font-bold mb-5 bg-base2  py-2 px-3 text-center rounded-lg block"
	href="/"
>
	← Home
</a>
<Card>
	{#if wrongProject}
		<div class="px-4">You are on wrong domain name.</div>
	{:else if loading}
		<div class="px-4">Loading...</div>
	{:else if error}
		<div class="text-danger">ERROR: <Json src={error} expandInitialy pad={1} /></div>
	{:else if emailVerified}
		<div class="px-4">
			<div class="border text-sm font-medium py-2 px-3">
				Your Email is Successfully verified for <span class="font-semibold underline text-base1">
					{forEmail}
				</span>
			</div>
		</div>
	{:else if mode === 'resetPassword'}
		<div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div class="w-full max-w-md space-y-8 mt-3">
				<div>
					<div class="flex justify-center">
						<Logo />
					</div>
					<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Reset Your Password
					</h2>
				</div>
				<form on:submit|preventDefault={reset} class="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" value="true" />
					<div class="-space-y-px rounded-md shadow-sm">
						<div>
							<label for="forgot-email-address" class="sr-only">Email address</label>
							<input
								bind:value={newPass}
								disabled={loading || passwordResetSuccess}
								id="forgot-email-address"
								name="new-password"
								type="text"
								required
								class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="New Password"
							/>
						</div>
					</div>

					{#if passErr}
						<div class="text-danger text-sm">
							{passErr.code ?? passErr}
						</div>
					{/if}

					{#if passwordResetSuccess}
						<div class="border text-sm font-medium py-2 px-3">
							You Have Successfully Reset Your password for <span
								class="font-semibold underline text-base1"
							>
								{forEmail}
							</span>
						</div>
					{/if}
					<div>
						<button
							disabled={loading || passwordResetSuccess}
							type="submit"
							class="group bg-base1 disabled:opacity-50 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								<!-- Heroicon name: mini/lock-closed -->
								<Secutity />
							</span>
							{#if passLoading}
								Loading...
							{:else}
								Set Password
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<div class="text-danger">Action {mode} is not Currently avalable on website</div>
	{/if}
</Card>
