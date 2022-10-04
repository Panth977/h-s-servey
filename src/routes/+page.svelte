<script lang="ts">
	console.log('home page entered');
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
