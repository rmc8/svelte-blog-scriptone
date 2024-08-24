<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	let columns = {};
	let resData = [];
	let loading = true;
	const exclude = ['アサガオの散る頃に', 'どんな結末がお望みだい？'];

	onMount(async () => {
		const response = await axios.get(
			'https://script.google.com/macros/s/AKfycbzxi7hwpLKjmMWH0sfW0bbMo7hUILMLd36R3QPPcoMhWDVcThCEUNIthHzI3uaym9-E/exec'
		);
		resData = response.data.data;
		columns = response.data.columns;
		loading = false;
	});
</script>

<section id="efficiency">
	<div class="container">
		<h2>プロセカ楽曲効率</h2>
		<p>
			プロセカ楽曲の効率表です。Expertで出せるスコアを100%とした場合、同じ楽曲で異なる難易度のスコア効率が良いか悪いかを表にまとめています。低難易度でもスコアが落ちにくいもの・高難易度でスコアが伸びやすいものは「Y」、スコアが伸びにくい楽曲は「N」としています。標準的な効率の楽曲については効率を記載していません。また、未実装のAppend曲は薄い黒塗りで表示しています。低難易度の楽曲はスキルの影響を強く受けやすいため、スキルずれが起こりづらくスキル効果を最大限に活用できる1枠でのプレイがオススメです。また、MasterやAppendにおいては、効率の幅が狭くミスによるスコア低下の影響を受けやすいため、「N」判定は他の難易度より厳しくつけています。長時間の周回や1000連勝以上の達成など、ハイスコアを継続的に出したり、高難易度の適切な回避にも利用しやすくなっています。一部の楽曲では、MasterやExpertよりもHard以下でスコアが出やすい曲や、高難易度と同等のスコアが出る曲もあります。しかし、基本的にこの表はイベラン用にライフを残しつつイベントポイント（スコア）を稼ぐために使用されることが望ましいです。連勝や討伐などで高いスコアを求める場合には、この表だけに頼るのではなく自分なりに目的を持って検証し、正しい理解のもとで難易度を判断できるようにお願いいたします。
		</p>
		<div class="pt-8">
			<p><b>(2024-08-24 18:00更新)</b></p>
			<p class="pt-4">
				楽曲難易度にAppendの表示を追加して、効率の判定方法を変更しました。今までは一定の値で効率・非効率の判断をしていましたが傾向の変化などに対応できるように以下の手順で効率判定をするように変更しました。(1)Expertを100%としたときに各楽曲の相対的なスコアの割合を算出します。(2)すべての楽曲でスコアの割合を算出した後、同じ難易度内でどの程度の割合で効率が良いか・悪いかを比較します。(3)同じ難易度内で上位15%以上を「Y」、下位15%(MasterとAppendは下位30%)以下を「N」として表します。そのため楽曲の追加の状況により効率の表示が変わる場合があります。
			</p>
		</div>
		<h3>楽曲効率表</h3>
		{#if loading}
			<div>Loading...</div>
		{:else}
			<table>
				<thead>
					<tr>
						<th>{columns.NAME}</th>
						<th style="width:80px;">{columns.Easy}</th>
						<th style="width:80px;">{columns.Normal}</th>
						<th style="width:80px;">{columns.Hard}</th>
						<th style="width:80px;">{columns.Master}</th>
						<th style="width:80px;">{columns.Append}</th>
					</tr>
				</thead>
				<tbody>
					{#each resData as music}
						{#if music.NAME && !exclude.includes(music.NAME)}
							<tr>
								<td>{music.NAME}</td>
								<td class={music.Easy} style="text-align:center;">{music.Easy}</td>
								<td class={music.Normal} style="text-align:center;">{music.Normal}</td>
								<td class={music.Hard} style="text-align:center;">{music.Hard}</td>
								<td class={music.Master} style="text-align:center;">{music.Master}</td>
								<td class={music.Append} style="text-align:center;">{music.Append}</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</section>

<style>
	th {
		text-align: center;
	}

	td.N,
	td.Y {
		font-size: 13px;
		font-weight: bold;
	}

	td.N {
		background-color: #0088ff22;
	}

	td.Y {
		background-color: #ff4a5222;
	}

	td.U {
		background-color: #0000002a;
		color: transparent;
	}

	tr:nth-child(even) {
		background-color: #f5f8f8;
	}

	tbody tr {
		border-bottom: 1px solid #eeeeee;
	}
</style>
