<script lang="ts">
	import Header from '../../../components/HeaderForPrsk.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Profile from '../../../components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Calc from './component/calc.svelte';
	import Table from './component/score_table.svelte';
	import Tabs from './component/tabs.svelte'; // タブコンポーネントをインポート

	let activeTab = 'table_contents'; // 初期表示タブを設定
</script>

<Header />
<main>
	<article>
		<div class="container">
			<h2>みんなでライブ用スコアアップ倍率確認</h2>
			<p>
				みんなでライブ向けのスコアアップ倍率（実行値）の計算をしたり、表による実行値の表示を行ったりします。
			</p>

			<div class="py-4">
				<Tabs bind:activeTab>
					<div slot="table_contents">
						<Table />
					</div>
					<div slot="calc_contents">
						<Calc />
					</div>
				</Tabs>
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
