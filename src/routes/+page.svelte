<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { browser } from '$app/env';
	import Card from '$lib/Components/Card.svelte';

	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import '../app.css';
	console.count('home');
	let ctx: HTMLCanvasElement;
	let radarChart: Chart | undefined;
	if (browser) Chart.register(...registerables);
	$: {
		if (ctx) {
			radarChart?.destroy();
			radarChart = new Chart(ctx, {
				type: selectedType,
				data,
				options: {
					scales: {
						r: {
							grid: { circular: true }
						}
					},
					elements: { line: { borderWidth: 3 } }
				}
			});
		}
	}
	export let colors = [
		'251, 175, 0',
		'255, 163, 175',
		'0, 124, 190',
		'0, 175, 84',
		'245, 143, 41',
		'217, 3, 104'
	];
	function bga(index: number, opacity?: number) {
		if (typeof opacity === 'number') return `rgba(${colors[index]}, ${opacity})`;
		return `rgb(${colors[index]})`;
	}
	const data = {
		labels: ['a', 'b', 'c', 'd', 'e'] as ['a', 'b', 'c', 'd', 'e'],
		datasets: [5, 10, 7, 12].map(function (m, i) {
			return {
				label: '(' + i + ')',
				data: [
					Math.random() * 10 * m,
					Math.random() * 10 * m,
					Math.random() * 10 * m,
					Math.random() * 10 * m,
					Math.random() * 10 * m
				],
				fill: true,
				backgroundColor: bga(i, 0.2),
				borderColor: bga(i),
				pointBackgroundColor: bga(i),
				pointBorderColor: '#000',
				pointHoverBackgroundColor: '#000',
				pointHoverBorderColor: bga(i)
			};
		})
	};
	let selectedType:
		| 'bar'
		| 'bubble'
		| 'doughnut'
		| 'line'
		| 'pie'
		| 'polarArea'
		| 'radar'
		| 'scatter' = 'bar' as any;
	const types: typeof selectedType[] = ['bar', 'line', 'polarArea', 'radar'];
</script>

Welcome to home page
<br />
{#await new Promise((res) => setTimeout(res, 5000))}
	<button disabled class="-bg-base2 bg-opacity-50 px-2 py-1 w-full mt-3">
		Collecting logs...
	</button>
{:then _}
	<button on:click={() => console.log('hi')} class="-bg-base2 text-base2 px-2 py-1 w-full mt-3">
		👍 Logs Collected 📋
	</button>
{/await}
<a href="/app" class="underline text-danger block text-center">App</a>
<Card>
	{#each types as type}
		<button
			disabled={type === selectedType}
			class="border mx-2 my-1 px-2 py-1 disabled:bg-base1 disabled:-text-base1"
			on:click={() => (selectedType = type)}
		>
			{type}
		</button>
	{/each}
	<canvas class="mt-5" bind:this={ctx} id="chart" />
</Card>
