<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { characterNameMappingForVs } from './characterData';
	import { rarityNameMapping } from './rarity';
	import type { CharacterRarityCounts } from '../../types/card';

	export let rarityCounter: CharacterRarityCounts;
	let chart: ApexCharts;
	let chartElement: HTMLElement;
	let ApexCharts;

	$: if (rarityCounter) {
		onMount(async () => {
			ApexCharts = (await import('apexcharts')).default;
            const excludeNames = ['fes', 'rarity_1', 'rarity_birthday'];
            let series = Object.keys(rarityCounter[Object.keys(rarityCounter)[0]])
            .filter(rarity => !excludeNames.includes(rarity))
            .map(rarity => ({
                name: rarityNameMapping[rarity] || rarity,
                data: Object.values(rarityCounter).map(counts => counts[rarity])
            }));
			let categories = Object.keys(rarityCounter).map(
				(enName) => characterNameMappingForVs[enName] || enName
			);
			const options = {
				chart: {
					type: 'bar',
					height: 800,
					stacked: true
				},
				plotOptions: {
					bar: {
						horizontal: true
					}
				},
				series: series,
				title: {
					text: 'バーチャルシンガー×レアリティー別カード枚数まとめ',
					align: 'center',
					style: { fontSize: '20px' }
				},
				xaxis: {
					categories: categories
				},
				grid: { show: false },
				colors: ['#8d77d8', '#ff647a', '#2ba0fc', '#2be7a6']
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
