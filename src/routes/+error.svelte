<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/Components/Header.svelte';
	$: console.error($page.status, $page.error.message);
</script>

<Header />
Page {$page.status}: Not Found
