<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import moment from 'moment';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Chart from './Chart.svelte';

	$: currentUrl = $page.url.href;

	let columns = {};
	let data = [];
	let loading = true;

	onMount(async () => {
		try {
			const response = await axios.get(
				'https://script.google.com/macros/s/AKfycbxJ9EzwcUE8kIxcNovzZRIGkN9wBSNy3hpptRzuGJHKMFCf9LzMZ8783hfMddr3Wn1Q/exec'
			);
			const dataResponse = response.data;
			columns = dataResponse.columns;
			data = dataResponse.data;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateStr) {
		return moment(dateStr).format('YYYY-MM-DD HH:mm');
	}
</script>

<svelte:head>
	<title>Scriptone - [プロセカ] アクティブユーザー数推移</title>
	<meta name="description" content="チアフルイベントの連勝のランキングを掲載しております。" />
	<meta name="twitter:site" content="@mskydev" />
	<meta name="twitter:creator" content="@mskydev" />
	<meta property="og:title" content="[プロセカ]アクティブユーザー数推移" />
	<meta name="twitter:title" content="[プロセカ]アクティブユーザー数推移" />
	<meta
		property="og:description"
		content="プロセカのアクティブユーザー数の推移をまとめております。"
	/>
	<meta
		name="twitter:description"
		content="プロセカのアクティブユーザー数の推移をまとめております。"
	/>
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<h2>[プロセカ]アクティブユーザー数推移</h2>
			<p>
				プロセカのアクティブユーザー数と推移をまとめております。数値は正確でない箇所もあるため参考程度にお願いいたします。
			</p>
			<p />

			{#if loading}
				<p>Loading...</p>
			{:else}
				<h3>推移グラフ</h3>
				<Chart />

				<h3>推移表</h3>
				<div class="table-container">
					<table class="shj" style="font-size: 13.5px;">
						<thead>
							<tr>
								<th>{columns.event_id}</th>
								<th>{columns.event_name}</th>
								<th>{columns.event_type}</th>
								<th>{columns.start_datetime}</th>
								<th>{columns.end_datetime}</th>
								<th>{columns.duration}</th>
								<th>{columns.active_user_count}</th>
								<th>{columns.moving_average}</th>
							</tr>
						</thead>
						<tbody>
							{#each data as row}
								<tr>
									<td style="text-align: center">{row.event_id}</td>
									<td>{row.event_name}</td>
									<td>{row.event_type}</td>
									<td>{formatDate(row.start_datetime)}</td>
									<td>{formatDate(row.end_datetime)}</td>
									<td style="text-align: right">{row.duration}</td>
									<td style="text-align: right">{Number(row.active_user_count).toLocaleString()}</td
									>
									<td style="text-align: right">{Number(row.moving_average).toLocaleString()}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
		<div class="container">
			<Share share_title="[プロセカ]アクティブユーザー数推移" share_url={currentUrl} />
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>

<Footer />
