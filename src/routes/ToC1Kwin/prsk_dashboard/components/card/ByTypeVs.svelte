<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { characterNameMappingForVs } from './characterData';
	import { typeNameMapping } from './cardType';
	import type { CharacterSkillCounts } from '../../types/card';

	export let typeCounter: CharacterSkillCounts;
	let chart: ApexCharts;
	let chartElement: HTMLElement;
	let ApexCharts;

	$: if (typeCounter) {
		onMount(async () => {
			ApexCharts = (await import('apexcharts')).default;
            const excludeNames = ['miku', 'rin', 'len', 'luka', 'meiko', 'kaito'];
			let filteredCharacterNames = Object.keys(typeCounter)
                .filter(enName => !excludeNames.includes(enName));
            let series = Object.keys(typeCounter[Object.keys(typeCounter)[0]])
                .map((cardType) => ({
                    name: typeNameMapping[cardType] || cardType,
                    data: filteredCharacterNames.map(enName => typeCounter[enName][cardType])
                }));
            let categories = filteredCharacterNames.map(
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
					text: '☆4バーチャルシンガー×タイプ別',
					align: 'center',
					style: { fontSize: '20px' }
				},
				xaxis: {
					categories: categories
				},
				grid: { show: false },
				colors: ['#ff647a', '#2ba0fc', '#2be7a6', '#fbb93e', '#7755ff'],
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
