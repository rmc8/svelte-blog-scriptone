<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Calc from './component/calc.svelte';
	import Table from './component/score_table.svelte';
	import Tabs from './component/tabs.svelte'; // タブコンポーネントをインポート

	let activeTab = $state('table_contents'); // 初期表示タブを設定
	let currentUrl = $derived($page.url.href);
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Scriptone - みんなでライブ用スコアアップ倍率確認</title>
	<meta
		name="description"
		content="みんなでライブ向けのスコアアップ倍率（実行値）の計算をしたり、表による実行値の表示をしたりします。"
	/>
	<meta name="twitter:site" content="@mskydev" />
	<meta name="twitter:creator" content="@mskydev" />
	<meta property="og:title" content="みんなでライブ用スコアアップ倍率確認" />
	<meta name="twitter:title" content="みんなでライブ用スコアアップ倍率確認" />
	<meta
		property="og:description"
		content="みんなでライブ向けのスコアアップ倍率（実行値）の計算をしたり、表による実行値の表示を行ったりします。"
	/>
	<meta
		name="twitter:description"
		content="みんなでライブ向けのスコアアップ倍率（実行値）の計算をしたり、表による実行値の表示を行ったりします。"
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
			<h2>みんなでライブ用スコアアップ倍率確認</h2>
			<p>
				みんなでライブ向けのスコアアップ倍率（実行値）の計算をしたり、表による実行値の表示をしたりします。
			</p>

			<div class="py-4">
				<Tabs bind:activeTab>
					{#snippet table_contents()}
										<div >
							<Table />
						</div>
									{/snippet}
					{#snippet calc_contents()}
										<div >
							<Calc />
						</div>
									{/snippet}
				</Tabs>
			</div>
		</div>
		<div class="container">
			<Share share_title="みんなでライブ用スコアアップ倍率確認" share_url={currentUrl} />
		</div>

		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />
