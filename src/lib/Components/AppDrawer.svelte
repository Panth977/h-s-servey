<script lang="ts">
	import Drawer from 'svelte-drawer-component';
	import Back from '../Icon/Back.svelte';

	export let open: boolean;
	export let close: () => void;
	export let title: string;
	export let placement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';
</script>

<Drawer {open} {placement} size="100%">
	<div class="app">
		<div class="header">Huddle & Score</div>
		<div class="contrast pb-9 mt-1">
			<div class="flex h-4 justify-between mx-8">
				<button on:click={close}><Back /></button>
				<span>{title}</span>
				<span />
			</div>
		</div>
		<div class="bg-base2 min-h-[calc(100vh-128px)] pt-1">
			<slot />
		</div>
	</div>
</Drawer>
