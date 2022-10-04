<script lang="ts">
	import { event, latestNewsListner, latestVideosListner } from '$lib/state';
	import type { Event, News, Video } from '$lib/firebase/db';
	import AppDrawer from '$lib/Components/AppDrawer.svelte';
	import Json from './json.svelte';
	import Header from '$lib/Components/Header.svelte';
	import { Chart, registerables } from 'chart.js';
	import { browser } from '$app/env';
	import Card from '$lib/Components/Card.svelte';
	import { onMount } from 'svelte';

	onMount(() => alert('Welcome to Huddle and Score!'));

	let ctx: HTMLCanvasElement;

	let radarChart: Chart | undefined;

	if (browser) Chart.register(...registerables);
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
	let events: Event[] = [];
	$: {
		events = [...events, $event];
	}
	let news: News[][] = [];
	const newsStore = latestNewsListner.store;
	$: {
		news = [...news, $newsStore.data];
	}

	let videos: Video[][] = [];
	const videoStore = latestVideosListner.store;
	$: {
		videos = [...videos, $videoStore.data];
	}
	let selectedData: any;
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
	async function copyLogs() {
		const text = JSON.stringify(
			{
				time: {
					date: new Date(),
					str: new Date().toString(),
					'utc-date': new Date(new Date().toString() + ' UTC'),
					'utc-iso': new Date(new Date().toString() + ' UTC').toISOString().substring(0, 16)
				},
				events,
				news,
				videos
			},
			function (this, key, val) {
				if ('value' in (Object.getOwnPropertyDescriptor(this, key) ?? {})) return val;
				return typeof val === 'object' && val !== null ? undefined : val;
			}
		);
		try {
			await navigator.clipboard.writeText(text);
			console.log('Async: Copying to clipboard was successful!');
			alert('send this the coppyed text to "Panth" in whatsapp');
		} catch (err) {
			console.error('Async: Could not copy text: ', err);
			log = text;
			var selection = window.getSelection();
			var range = document.createRange();
			range.selectNodeContents(pLog);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}
	let log: string | undefined;
	let pLog: HTMLParagraphElement;
</script>

<Header title="Debug" tralingLogo />
<AppDrawer title="Logs" close={() => (log = undefined)} open={log !== undefined}>
	<h2 class="text-3xl">send this text to "Panth" in whatsapp</h2>
	<p bind:this={pLog}>{log}</p>
</AppDrawer>
{#await new Promise((res) => setTimeout(res, 5000))}
	<button disabled class="-bg-base2 bg-opacity-50 px-2 py-1 w-full mt-3">
		Collecting logs...
	</button>
{:then _}
	<button class="-bg-base2 px-2 py-1 w-full mt-3" on:click={copyLogs}> 👍 Copy Logs 📋 </button>
{/await}

<div class="page-margin mt-3">
	date: {new Date()}
	<br />
	str: {new Date().toString()}
	<br />
	utc-date: {new Date(new Date().toString() + ' UTC')}
	<br />
	utc-iso: {new Date(new Date().toString() + ' UTC').toISOString().substring(0, 16)}
	<br />
	<br />
	<ol class="list-decimal list-inside">
		{#each $event.fixtures as fixture, i}
			<li>
				{fixture.time.localeCompare(
					new Date(new Date().toString() + ' UTC').toISOString().substring(0, 16)
				) > 0
					? '🕔'
					: '👍'}
				{fixture.team1.acronym} vs {fixture.team2.acronym} @ {fixture.time}
			</li>
		{/each}
	</ol>
</div>
<div class="mt-3" />
<AppDrawer title="Debug event" close={() => (selectedData = undefined)} open={selectedData}>
	Root: <Json src={selectedData} />
</AppDrawer>
{#each events as data, i}
	<button class="border px-2 py-1 mx-2 my-1" on:click={() => (selectedData = data)}>
		Event {i}
	</button>
{/each}
<br />
{#each news as data, i}
	<button class="border px-2 py-1 mx-2 my-1" on:click={() => (selectedData = data)}>
		News {i}
	</button>
{/each}
<br />
{#each videos as data, i}
	<button class="border px-2 py-1 mx-2 my-1" on:click={() => (selectedData = data)}>
		Videos {i}
	</button>
{/each}
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
