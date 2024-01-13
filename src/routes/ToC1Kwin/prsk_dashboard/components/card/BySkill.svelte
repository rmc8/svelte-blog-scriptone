<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { characterNameMapping } from './characterData';
	import { skillNameMapping } from './skill';
	import type { CharacterSkillCounts } from '../../types/card';

	export let skillCounter: CharacterSkillCounts;
	let chart: ApexCharts;
	let chartElement: HTMLElement;
	let ApexCharts;

	$: if (skillCounter) {
		onMount(async () => {
			ApexCharts = (await import('apexcharts')).default;
            const excludeNames = ['miku', 'rin', 'len', 'luka', 'meiko', 'kaito'];
			let filteredCharacterNames = Object.keys(skillCounter)
                .filter(enName => !excludeNames.includes(enName));
            let series = Object.keys(skillCounter[Object.keys(skillCounter)[0]])
                .map((cardType) => ({
                    name: skillNameMapping[cardType] || cardType,
                    data: filteredCharacterNames.map(enName => skillCounter[enName][cardType])
                }));
            let categories = filteredCharacterNames.map(
                (enName) => characterNameMapping[enName] || enName
            );
			const options = {
				chart: {
					type: 'bar',
					height: 640,
					stacked: true
				},
				plotOptions: {
					bar: {
						horizontal: true
					}
				},
				series: series,
				title: {
					text: '☆4キャラクター×スキル別カード枚数まとめ',
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
