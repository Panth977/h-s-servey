<script lang="ts">
	import { page } from '$app/stores';
	$: console.error($page.status, $page.error.message);
</script>

Page {$page.status}: Not Found
