<script lang="ts">
	import type { ShareInfo } from '$lib/Icon/Share.svelte';
	import Drawer from 'svelte-drawer-component';
	import Back from '../Icon/Back.svelte';
	import Header from './Header.svelte';

	export let open: boolean;
	export let close: () => void;
	export let title: string;
	export let placement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';
	export let bg: 'base1' | 'base2' = 'base2';
	export let share: ShareInfo | undefined = undefined;
</script>

<Drawer {open} {placement} size="100%">
	<div class="app">
		<div class:contrast={bg === 'base2'} class="pb-9 mt-1">
			<Header {title} onBack={close} {share} />
		</div>
		{#if bg === 'base1'}
			<div class="pb-5">
				<slot />
			</div>
		{:else}
			<div class="bg-base2 min-h-[calc(100vh-128px)] pt-1">
				<slot />
			</div>
		{/if}
	</div>
</Drawer>
