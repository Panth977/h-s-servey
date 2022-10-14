<script lang="ts">
	export let src: any;
	export let expandInitialy = true;
	let expand = expandInitialy;
	let showIfGetter: string[] = [];
	export let pad = 1;
	$: padPx = pad * 15;
</script>

{#if typeof src === 'object'}
	{#if src === null}
		Null
	{:else if Array.isArray(src)}
		{#if src.length === 0}
			{'Array[0]'}
		{:else if expand}
			<button on:click={() => (expand = false)}> ▲ {' Array ['} </button>
			{#each src as val, i}
				<div style="padding-left: {padPx}px;">
					{i}: <svelte:self expandInitialy={false} pad={pad + 1} src={val} />
				</div>
			{/each}
			{']'}
		{:else}
			<button on:click={() => (expand = true)}>
				{' Array [...' + src.length + ']'}
			</button>
		{/if}
	{:else if Object.keys(src).length === 0}
		{'Object { 0 }'}
	{:else if expand}
		<button on:click={() => (expand = false)}> ▲ {' Object {'}</button>
		{#each Object.keys(src) as key}
			{#if 'value' in (Object.getOwnPropertyDescriptor(src, key) ?? {})}
				<div style="padding-left: {padPx}px;">
					<span class="font-bold">{key}:</span>
					<svelte:self expandInitialy={false} pad={pad + 1} src={src[key]} />
				</div>
			{:else if Object.getOwnPropertyDescriptor(src, key)?.get}
				{#if showIfGetter.includes(key)}
					<div style="padding-left: {padPx}px;">
						<span class="font-bold">{key}:</span>
						Getter (
						<svelte:self expandInitialy={false} pad={pad + 1} src={src[key]} />
						)
					</div>
				{:else}
					<div style="padding-left: {padPx}px;">
						<span class="font-bold">{key}:</span>
						<button on:click={() => (showIfGetter = [...showIfGetter, key])}>Getter (...)</button>
					</div>
				{/if}
			{/if}
		{/each}
		{'}'}
	{:else}
		<button on:click={() => (expand = true)}>
			{' Object {...' + Object.keys(src).length + '}'}
		</button>
	{/if}
{:else}
	{src}
{/if}
