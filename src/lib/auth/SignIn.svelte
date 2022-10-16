<script lang="ts">
	import { onMount } from 'svelte';
	import Forgot from './Forgot.svelte';
	import Login from './Login.svelte';
	import Register from './Register.svelte';

	let content: HTMLElement;
	onMount(function () {
		content.scrollTo({ behavior: 'auto', left: content.scrollWidth / 2 });
	});
</script>

<ul
	bind:this={content}
	class="flex w-full snap-x scroll-smooth snap-mandatory gap-6 overflow-x-auto overscroll-x-none hide-scroll-bar"
>
	<li id="forgot" class="screen-width object-cover relative shrink-0 snap-center"><Forgot /></li>
	<li id="login" class="screen-width object-cover relative shrink-0 snap-center"><Login /></li>
	<li id="register" class="screen-width object-cover relative shrink-0 snap-center">
		<Register />
	</li>
</ul>
