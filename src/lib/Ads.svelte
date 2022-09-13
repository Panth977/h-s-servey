<script lang="ts">
	import Modal from './Modal.svelte';

	let modal: undefined | number;
	export let data = [
		{ src: '/ad-1.svg', url: 'https://www.google.com', title: 'ad-1' },
		{ src: '/ad-2.svg', url: 'https://www.google.com', title: 'ad-2' },
		{ src: '/ad-3.svg', url: 'https://www.google.com', title: 'ad-3' }
	];

	function getAdId(index: number) {
		return `open-${index}`;
	}
</script>

<Modal
	close={() => (modal = undefined)}
	open={modal !== undefined}
	title={data[modal ?? -1]?.title}
>
	{#if modal !== undefined}
		<img alt={data[modal].title} class="mt-3 h-44 object-contain" src={data[modal].src} />
		<div class="flex justify-end">
			<a
				class="p-2 border-b text-2xl h-10 capitalize bg-stone-800"
				href={data[modal].url}
				target="_blank"
			>
				<img alt="link" class="h-auto aspect-square w-5 ml-2" src="/go-to-icon.svg" />
			</a>
		</div>
	{/if}
</Modal>
<ul
	class="flex w-full mt-5 snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-none before:w-3 before:shrink-0 after:w-3 after:shrink-0 hide-scroll-bar"
>
	{#each data as { src, title: alt }, index}
		<li id={getAdId(index)} class="relative shrink-0 snap-center">
			<div class="absolute right-[50%] top-[50%]" />
			<img on:click={() => (modal = index)} {src} class="h-[103px] ad-img object-cover" {alt} />
		</li>
	{/each}
</ul>
