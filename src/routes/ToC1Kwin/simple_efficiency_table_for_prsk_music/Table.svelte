<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	let columns = {};
	let data = [];
	let loading = true;

	onMount(async () => {
		const response = await axios.get(
			'https://script.google.com/macros/s/AKfycbyRqBREk3ZYTOzvkuw_ZdnG28U__c-64VeXweDP-5PnMjpzuhrf1QIgBbByCTl1xPqO/exec'
		);
		data = response.data.data;
		columns = response.data.columns;
		loading = false;
	});
</script>

<section id="efficiency">
	<div class="container">
		<h2>プロセカ楽曲効率</h2>
		<p>
			プロセカ楽曲の効率表です。Expertで出せるスコアを100%とした場合、同じ楽曲で異なる難易度のスコア効率が良いか悪いかを表にまとめました。低難易度でもスコアが落ちにくいもの・高難易度でスコアが伸びやすいものは「Y」、スコアが伸びにくい楽曲は「N」としています。標準的な効率の楽曲については効率を記載していません。
		</p>
		<p>
			低難易度の楽曲はスキルの影響を強く受けやすいため、スキルずれが起こりづらくスキル効果を最大限に活用できる1枠でのプレイがオススメです。また、Masterの場合、ほとんどの曲はAPを使えばExpertと同等以上のスコアが出ることが多いため、「N」判定は厳しくつけています。長時間の周回や1000連勝以上の達成など、ハイスコアを継続的に出すためには、高難易度の回避にも利用できます。
		</p>
		<p>
			一部の楽曲では、MasterやExpertよりもHard以下でスコアが出やすい曲や、高難易度と同等のスコアが出る曲もあります。しかし、基本的にこの表はイベラン用にライフを残しつつイベントポイント（スコア）を稼ぐために使用されることが望ましいです。連勝や討伐などで高いスコアを求める場合には、この表だけに頼るのではなく自分なりに目的を持って検証し、正しい理解のもとで難易度を判断できるようにお願いいたします。
		</p>
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
					</tr>
				</thead>
				<tbody>
					{#each data as music}
						<tr>
							<td>{music.NAME}</td>
							<td class={music.Easy} style="text-align:center;">{music.Easy}</td>
							<td class={music.Normal} style="text-align:center;">{music.Normal}</td>
							<td class={music.Hard} style="text-align:center;">{music.Hard}</td>
							<td class={music.Master} style="text-align:center;">{music.Master}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</section>

<style>
    div.table-container {
        overflow-x: auto;
    }

    th {
        background-color: #24aab3;
        color: white;
        text-align: center;
    }

    tbody tr {
        /* border-bottom: 1px dotted #ddd; */
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

    tr:nth-child(even) {
    background-color: #f5f8f8;
}

tbody tr {
    border-bottom: 1px solid #eeeeee; 
}
</style>