<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy } from 'svelte';

	import type { DiffData } from '../types/diff';

	interface Props {
		diffObj: DiffData;
	}

	let { diffObj }: Props = $props();
	let chart: ApexCharts = $state();
	let chartElement: HTMLElement = $state();
	let ApexCharts = $state();

	run(() => {
		if (diffObj) {
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
					title: { text: '楽曲難易度分布', align: 'center', style: { fontSize: '20px' } },
					chart: { type: 'bar', height: 600, stacked: true, toolbar: { show: true } },
					plotOptions: { bar: { horizontal: true } },
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
	});
	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div bind:this={chartElement}></div>
