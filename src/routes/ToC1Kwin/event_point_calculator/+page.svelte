<script lang="ts">
	import Header from '../../../components/HeaderForPrsk.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Profile from '../../../components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';

	import { onMount } from 'svelte';
	import axios from 'axios';

	let inputNumber: number | null = null;
	let jsonData = {};
	let contents = {};
	let errorMessage = '';
	let currentPage = 1;
	const pageSize = 8;
	let filteredData = { records: [], totalCount: 0 };

	onMount(async () => {
		try {
			const response = await axios.get(
				// 'https://rmc8.github.io/ToC1Kwin/event_point_calculator/data/event_point.json'
				'https://raw.githubusercontent.com/rmc8/prsk_event_point_calc/main/api/point_data_bp100.json'
			);
			jsonData = response.data;
		} catch (error) {
			console.log(error);
		}
	});

	$: {
		if (inputNumber !== null) {
			currentPage = 1;
		}
		updateFilteredData();
	}

	function changePage(page:any) {
		currentPage = page;
		updateFilteredData();
	}

	function updateFilteredData() {
		if (inputNumber === null) {
			errorMessage = '';
			filteredData = { records: [], totalCount: 0 };
			return;
		}
		const raw = jsonData[inputNumber];
		if (!raw) {
			errorMessage = '※該当のデータがありません';
			filteredData = { records: [], totalCount: 0 };
			return;
		}
		errorMessage = '';
		const start = (currentPage - 1) * pageSize;
		const end = start + pageSize;
		filteredData = {
			records: raw.slice(start, end),
			totalCount: raw.length
		};
	}
</script>

<svelte:head>
	<title>Scriptone - 独りんぼエンヴィーイベントポイント計算機</title>
	<meta name="description" content="チアフルイベントの連勝のランキングを掲載しております。" />
	<meta name="twitter:site" content="@ToC1Kwin" />
	<meta name="twitter:creator" content="@ToC1Kwin" />
	<meta property="og:title" content="独りんぼエンヴィーイベントポイント計算機" />
	<meta name="twitter:title" content="独りんぼエンヴィーイベントポイント計算機" />
	<meta
		property="og:description"
		content="独りんぼエンヴィーでのイベントポイントの調整のための計算をします。"
	/>
	<meta
		name="twitter:description"
		content="独りんぼエンヴィーでのイベントポイントの調整のための計算をします。"
	/>
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<h2>Event Point Calculator</h2>
			<p>
				独りんぼエンヴィーでのイベントポイントの調整のための計算をします。炊きありの場合には小数点の切り捨ての関係で誤差が出る場合がありますため、最終的な調整は0炊きでお願いいたします。
			</p>
			<div class="calculator" style="padding-top:32px;">
				<div class="form">
					<p>
						<label>獲得したいイベントポイントを数値で入力してください。</label><br />
						<input
							class="event_point_input border border-gray-300 rounded-md"
							type="number"
							bind:value={inputNumber}
							placeholder="Input number"
						/>
						{#if errorMessage === ''}
							<span class="pagination" style="padding-left: 16px;">
								{#each Array(Math.ceil(filteredData.totalCount / pageSize)) as _, i (i)}
									<button on:click={() => changePage(i + 1)}>{i + 1}</button>
								{/each}
							</span>
						{/if}
					</p>
				</div>
				<div class="result">
					{#if errorMessage !== ''}
						<p class="error">{errorMessage}</p>
					{/if}

					<!-- Filtered data -->
					{#if errorMessage === ''}
						<table class="shj">
							<thead>
								<tr>
									<th>イベントボーナス</th>
									<th>炊き数</th>
									<th>スコア下限</th>
									<th>スコア上限</th>
								</tr>
							</thead>
							<tbody>
								{#each filteredData.records as data}
									<tr>
										<td style="text-align:right">{data[0]}</td>
										<td style="text-align:center">{data[1]}</td>
										<td style="text-align:right">{data[2]}</td>
										<td style="text-align:right">{data[3]}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
			</div>
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>
<Footer />

<style>
	.event_point_input {
		width: 160px;
		font-size: 20px;
		padding: 8px;
		margin-top: 24px;
		margin-bottom: 24px;
	}

	table {
		max-width: 440px;
	}

	.error {
		color: #822;
		font-weight: bold;
	}

	.pagination button {
		border: 0px;
		background-color: #24aab3;
		color: white;
		font-weight: bold;
		width: 32px;
		height: 32px;
		margin-right: 8px;
		border-radius: 50%;
	}

	.pagination button:hover,
	.pagination button:active {
		background-color: #0c323c;
	}

	.pagination button.active {
		background-color: #eeeeee;
		color: #444;
	}

	.pagination {
		padding-bottom: 24px;
	}
</style>
