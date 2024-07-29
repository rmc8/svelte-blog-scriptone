<script lang="ts">
	import scoreData from './data/scoreup.json';
	import { onMount } from 'svelte';

	let filteredData = [];
	let scoreUpFilter = '';
	let internalValueFilter = '';

	onMount(() => {
		filteredData = scoreData.data.slice(0, 30);
	});

	function handleFilter() {
		filteredData = scoreData.data
			.filter(
				(item) =>
					item.score_up.toString().includes(scoreUpFilter) &&
					`${item.leader}/${item.total}`.includes(internalValueFilter)
			)
			.slice(0, 30);
	}
</script>

<section id="table">
	<h3 class="text-left mb-2">スコアアップ倍率表</h3>
	<p class="w-full pb-4">
		スコアアップ倍率(実効値)および内部値を表示した表です。フィルターに数値を入力すると、部分的に一致した行を最大で30件表示します。
	</p>
	<div　class="text-left w-full">
		<table class="rounded-md overflow-hidden">
			<thead>
				<tr class="bg-[#0aadb9] text-white">
					<th class="p-2">
						<div class="text-center mb-2">スコアアップ倍率</div>
						<div class="flex justify-center">
							<input
								type="text"
								bind:value={scoreUpFilter}
								placeholder="フィルター"
								on:input={handleFilter}
								class="p-1 text-black border border-gray-300 rounded w-32"
							/>
						</div>
					</th>
					<th class="p-2">
						<div class="text-center mb-2">内部値</div>
						<div class="flex justify-center">
							<input
								type="text"
								bind:value={internalValueFilter}
								placeholder="フィルター"
								on:input={handleFilter}
								class="p-1 text-black border border-gray-300 rounded w-24"
							/>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredData as row, i}
					<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
						<td class="p-3 text-right">{row.score_up}%</td>
						<td class="p-3 text-right">{row.leader}/{row.total}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

