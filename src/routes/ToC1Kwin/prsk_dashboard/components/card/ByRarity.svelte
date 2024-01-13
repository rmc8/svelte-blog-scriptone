<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { characterNameMapping } from './characterData';
	import { rarityNameMapping } from './rarity';
	import type { CharacterRarityCounts } from '../../types/card';

	export let rarityCounter: CharacterRarityCounts;
	let chart: ApexCharts;
	let chartElement: HTMLElement;
	let ApexCharts;

	$: if (rarityCounter) {
		onMount(async () => {
			ApexCharts = (await import('apexcharts')).default;
			let series = Object.keys(rarityCounter[Object.keys(rarityCounter)[0]]).map((rarity) => ({
				name: rarityNameMapping[rarity] || rarity,
				data: Object.values(rarityCounter).map((counts) => counts[rarity])
			}));
			let categories = Object.keys(rarityCounter).map(
				(enName) => characterNameMapping[enName] || enName
			);
			const options = {
				chart: {
					type: 'bar',
					height: 720,
					stacked: true
				},
				plotOptions: {
					bar: {
						horizontal: true
					}
				},
				series: series,
				title: {
					text: 'キャラクター×レアリティー別',
					align: 'center',
					style: { fontSize: '20px' }
				},
				xaxis: {
					categories: categories
				},
				grid: { show: false },
				colors: ['#ff647a', '#f364ff', '#7755ff', '#2ba0fc', '#2be7a6', '#fbb93e', '#fb6f3e'],
			};
			chart = new ApexCharts(chartElement, options);
			chart.render();
		});
	}
	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div bind:this={chartElement} />
