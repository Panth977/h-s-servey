<script lang="ts" context="module">
	export interface Dataset<T extends string> {
		labels: T[];
		data: {
			label: string;
			values: { [key in T]: number };
		}[];
	}
</script>

<script lang="ts">
	import Card from '$lib/Components/Card.svelte';
	import { Chart, registerables } from 'chart.js';
	import { browser } from '$app/env';

	let ctx: HTMLCanvasElement;
	type T = $$Generic<string>;
	export let dataset: Dataset<T>;

	let radarChart: Chart | undefined;

	if (browser) Chart.register(...registerables);

	$: {
		if (ctx) {
			radarChart?.destroy();
			radarChart = new Chart(ctx, {
				type: 'radar',
				data: generateDataSet(dataset),
				options: {
					animation: {
						easing: 'easeInOutSine'
					},
					scales: {
						r: {
							grid: {
								circular: true
							},
							min: 0,
							suggestedMax: 10
						}
					},
					elements: {
						line: {
							borderWidth: 3
						}
					}
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
	function generateDataSet<T extends string>(data: Dataset<T>) {
		return {
			labels: data.labels,
			datasets: data.data.map(function ({ label, values }, index) {
				return {
					label,
					data: data.labels.map((x) => values[x]),
					fill: true,
					backgroundColor: bga(index, 0.2),
					borderColor: bga(index),
					pointBackgroundColor: bga(index),
					pointBorderColor: '#000',
					pointHoverBackgroundColor: '#000',
					pointHoverBorderColor: bga(index)
				};
			})
		};
	}
</script>

<Card>
	<canvas bind:this={ctx} id="radar-chart" />
</Card>
