<script lang="ts">
	import Logo from '../Icon/Logo.svelte';
	export let title: string | undefined = undefined;
	export let titleDiv = true;
	export let viewMore: { onClick?: VoidFunction; placeholder: string; herf?: string } | undefined =
		undefined;
</script>

<div class="card">
	<div class="bg-base2 py-3">
		{#if title}
			<h3
				class="text-lg text-base1 page-padding font-semibold flex justify-between {titleDiv
					? 'border-b'
					: ''}"
			>
				<span>{title}</span><Logo />
			</h3>
		{/if}
		<slot />
		{#if viewMore}
			{#if viewMore.herf}
				<a
					class="page-padding flex justify-end w-full text-base1 border-base1/50 border-t mt-2 font-medium"
					href={viewMore.herf}
					on:click={viewMore.onClick}
				>
					{viewMore.placeholder} <span class="ml-2">→</span>
				</a>
			{:else}
				<button
					class="page-padding flex justify-end w-full text-base1 border-base1/50 border-t mt-2 font-medium"
					on:click={viewMore.onClick}
				>
					{viewMore.placeholder} <span class="ml-2">→</span>
				</button>
			{/if}
		{/if}
	</div>
</div>
