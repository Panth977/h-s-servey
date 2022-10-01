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
				class="text-2xl text-base1 page-padding font-bold flex justify-between {titleDiv
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
					class="block text-center w-full text-base1 border-base1/50 border-t mt-2 font-medium"
					href={viewMore.herf}
					on:click={viewMore.onClick}
				>
					{viewMore.placeholder}
				</a>
			{:else}
				<button
					class="w-full text-base1 border-base1/50 border-t mt-2 font-medium"
					on:click={viewMore.onClick}
				>
					{viewMore.placeholder}
				</button>
			{/if}
		{/if}
	</div>
</div>
