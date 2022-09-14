<script lang="ts">
	import { onMount } from 'svelte';
	import Overview from './overview.svelte';
	import Squad from './squad.svelte';

	let xPos = 0;
	let content: HTMLElement;
	function listner() {
		let posTo = content.scrollLeft / content.scrollWidth;
		if (posTo < 0.05) posTo = 0;
		else if (posTo > 0.45) posTo = 0.5;
		xPos = posTo;
	}
	onMount(function () {
		content.addEventListener('scroll', listner);
		return () => content.removeEventListener('scroll', listner);
	});
</script>

<div class="relative text-base1 font-thin w-64 text-center mt-5 rounded-lg bg-base1light mx-auto">
	<div class="absolute bg-base2 rounded-lg h-full w-32" style="left: {xPos * 100}%;" />
	<button
		on:click={() => content.scrollTo({ behavior: 'smooth', left: 0 })}
		class="relative pl-9 z-10 pr-8 py-2"
	>
		Overview
	</button>
	<button
		on:click={() => content.scrollTo({ behavior: 'smooth', left: content.scrollWidth / 2 })}
		class="relative pr-9 z-10 pl-8 py-2"
	>
		Squad
	</button>
</div>

<ul
	bind:this={content}
	class="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-none hide-scroll-bar"
>
	<li class="screen-width object-cover relative shrink-0 snap-center"><Overview /></li>
	<li class="screen-width object-cover relative shrink-0 snap-center"><Squad /></li>
</ul>
