<script lang="ts">
	export let data = [
		{ src: '/ad-1.svg', title: 'ad-1' },
		{ src: '/ad-2.svg', title: 'ad-2' },
		{ src: '/ad-3.svg', title: 'ad-3' }
	];

	function getAdId(index: number) {
		return `open-${index}`;
	}
</script>

<ul
	class="flex w-full mt-5 snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-none before:w-3 before:shrink-0 after:w-3 after:shrink-0 hide-scroll-bar"
>
	{#each data as { src, title: alt }, index}
		<li id={getAdId(index)} class="relative shrink-0 snap-center">
			<div class="absolute right-[50%] top-[50%]" />
			<img {src} class="h-[103px] ad-img object-cover" {alt} />
		</li>
	{/each}
</ul>
