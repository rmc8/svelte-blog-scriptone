<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import type { DiffData } from '../types/diff';

	export let diffObj: DiffData;
	let chart: ApexCharts;
	let chartElement: HTMLElement;
	let ApexCharts;

	$: if (diffObj) {
		onMount(async () => {
			ApexCharts = (await import('apexcharts')).default;
			const options = {
				series: [
					{ name: 'Easy', data: Object.values(diffObj.easy) },
					{ name: 'Normal', data: Object.values(diffObj.normal) },
					{ name: 'Hard', data: Object.values(diffObj.hard) },
					{ name: 'Expert', data: Object.values(diffObj.expert) },
					{ name: 'Master', data: Object.values(diffObj.master) },
					{ name: 'Append', data: Object.values(diffObj.append) }
				],
                title: {text:"楽曲難易度分布", align: "center", style:{fontSize: "20px"}},
				chart: { type: 'bar', height: 350, stacked: true, toolbar: { show: true } },
                xaxis: { categories: diffObj.difficulties },
				grid: { show: false },
				colors: [
					'#2be7a6', // Easy
					'#2ba0fc', // Normal
					'#fbb93e', // Hard
					'#ff647a', // Expert
					'#8d77d8', // Master
					'#777777' // Append
				]
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
