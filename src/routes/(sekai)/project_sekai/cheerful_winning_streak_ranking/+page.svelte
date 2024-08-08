<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';

	$: currentUrl = $page.url.href;
	let contents = {};
	let columns = {};
	let rankings = [];
	let loading = true;

	onMount(async () => {
		try {
			const rankingResponse = await axios.get(
				'https://script.google.com/macros/s/AKfycbw0pNxZuGQ8FdmMIi9Or6MM3SNvAcPlLXEniaD7onvmzhybTC-hyis53NiApqjzrIRf/exec'
			);
			columns = rankingResponse.data.columns;
			rankings = rankingResponse.data.rankings;
			loading = false;
		} catch (error) {
			console.log(error);
		}
	});

	const filteredRankings = () => rankings.filter((ranking) => ranking.team_name !== '');
</script>

<svelte:head>
	<title>Scriptone - チアフル連勝ランキング</title>
	<meta name="description" content="チアフルイベントの連勝のランキングを掲載しております。" />
	<meta property="og:title" content="チアフル連勝ランキング" />
	<meta name="twitter:title" content="チアフル連勝ランキング" />
	<meta
		property="og:description"
		content="チアフルイベントの連勝のランキングを掲載しております。"
	/>
	<meta
		name="twitter:description"
		content="チアフルイベントの連勝のランキングを掲載しております。"
	/>
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/cheerful_winning_streak_ranking/img/cheerful_eyecatch.jpg"
	/>
	<meta
		property="og:url"
		content="https://rmc8.github.io/ToC1Kwin/cheerful_winning_streak_ranking/"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/cheerful_winning_streak_ranking/img/cheerful_eyecatch.jpg"
	/>
</svelte:head>

<main>
	<Header />
	<article>
		<div class="container">
			<h2>チアフル連勝ランキング</h2>
			<p>
				チアフルの連勝数のランキング表です。同じ連勝数の場合にはイベントが古い順に上位となります。同じイベントで同じ連勝数の場合には(1)DMを頂いた日時、(2)連勝報告をしたツイートの日時のどちらかで早い方を上位とします。詳細は以下をご覧ください。
			</p>
			<div style="margin-top:40px;margin-bottom:40px;">
				<blockquote class="twitter-tweet">
					<p lang="ja" dir="ltr">
						チアフルの連勝数を競うランキングをつくり、ランキングを公開するアカウントです。添付の画像に沿ってランキングを作成いたします。連勝数で競ったり、連勝の思い出を残したりなど楽しくご活用くださいましたら幸いです。
						<a href="https://t.co/3LtBRGA54l">pic.twitter.com/3LtBRGA54l</a>
					</p>
					&mdash; チアフル連勝ランキング (@CheerfulWinsRnk)<a
						href="https://twitter.com/CheerfulWinsRnk/status/1633356853886488577?ref_src=twsrc%5Etfw"
						>March 8, 2023</a
					>
				</blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
			{#if loading}
				<div id="loading-spinner">...</div>
			{/if}
			{#if !loading}
				<div class="ranking">
					<div class="table-container">
						<table>
							<thead>
								<tr>
									<th>{columns.rank}</th>
									<th>{columns.team_name}</th>
									<th>{columns.winning_streak}</th>
									<th>{columns.member1}</th>
									<th>{columns.member2}</th>
									<th>{columns.member3}</th>
									<th>{columns.member4}</th>
									<th>{columns.member5}</th>
									<th>{columns.event_name}</th>
									<th>{columns.group_name}</th>
									<th>{columns.approver}</th>
								</tr>
							</thead>
							<tbody>
								{#each filteredRankings() as ranking}
									<tr>
										<td style="text-align:center;">{ranking.rank}</td>
										<td>{ranking.team_name}</td>
										<td style="text-align:right;">{ranking.winning_streak}</td>
										<td>{ranking.member1}</td>
										<td>{ranking.member2}</td>
										<td>{ranking.member3}</td>
										<td>{ranking.member4}</td>
										<td>{ranking.member5}</td>
										<td>{ranking.event_name}</td>
										<td>{ranking.group_name}</td>
										<td>{ranking.approver}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		</div>
		<div class="container">
			<Share share_title="チアフル連勝ランキング" share_url={currentUrl} />
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
	<Footer />
</main>

<style>
	div.table-container {
		overflow-x: auto;
		border-radius: 5px;
	}

	table {
		width: 100%;
		font-size: 13px;
		border-radius: 5px;
	}

	th {
		text-align: center;
	}

	tr:nth-of-type(1),
	tr:nth-of-type(2),
	tr:nth-of-type(3) {
		/* font-weight: bold; */
	}

	tr:nth-of-type(1):hover,
	tr:nth-of-type(2):hover,
	tr:nth-of-type(3):hover {
		background-color: #f2f2f2;
	}

	tr:nth-of-type(1) {
		background-color: #fffbef;
	}

	tr:nth-of-type(2) {
		background-color: #f2f8ff;
	}

	tr:nth-of-type(3) {
		background-color: #fff5eb;
	}
</style>
