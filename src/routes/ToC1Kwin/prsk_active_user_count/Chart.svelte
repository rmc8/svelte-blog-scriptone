<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import axios from 'axios';

	let chart = null;
	let chartDiv;
	let ApexCharts;

	onMount(async () => {
		try {
			const response = await axios.get(
				'https://script.google.com/macros/s/AKfycbxJ9EzwcUE8kIxcNovzZRIGkN9wBSNy3hpptRzuGJHKMFCf9LzMZ8783hfMddr3Wn1Q/exec'
			);
			const jsonData = response.data;

			const labels = jsonData.data.map((item) => item.end_datetime);
			const activeUserCountData = jsonData.data.map((item) => item.active_user_count);
			const movingAverageData = jsonData.data.map((item) => item.moving_average);
			const eventNames = jsonData.data.map((item) => item.event_name);
            ApexCharts = (await import('apexcharts')).default;

			chart = new ApexCharts(chartDiv, {
				series: [
					{
						name: 'アクティブ数',
						data: activeUserCountData,
						text: eventNames
					},
					{
						name: '移動平均',
						data: movingAverageData,
						text: eventNames
					}
				],
				colors: ['#4BC0C0', '#FF6384'],
				chart: {
					type: 'line',
					height: 520
				},
				title: {
					text: 'プロセカ - アクティブユーザー数推移'
				},
				xaxis: {
					type: 'datetime',
					labels: {
						datetimeUTC: false,
						datetimeFormatter: {
							year: 'yyyy',
							month: "MMM 'yy",
							day: 'dd MMM',
							hour: 'HH:mm'
						},
						showEvery: 3
					},
					categories: labels
				},
				yaxis: {
					max: 3000000,
					min: 0,
					tickAmount: 6,
					labels: {
						formatter: function (val) {
							return val.toLocaleString(); 
						}
					}
				},
				legend: {
					position: 'top'
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						}
					}
				}
			});

			chart.render();
		} catch (error) {
			console.log(error);
		}
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div id="chart" bind:this={chartDiv} />

<style>
	#chart {
		max-width: 1080px;
	}
</style>