<script lang="ts">
	export let activeTab: string;

	const tabs = [
		{ name: 'スコアアップ表', id: 'table_contents' },
		{ name: 'スコアアップ値計算', id: 'calc_contents' }
	];
</script>

<div class="flex mt-8">
	{#each tabs as tab}
		<button
			class="px-4 py-2 border-t border-l border-r rounded-t-lg focus:outline-none
                   {activeTab === tab.id
				? 'bg-[#0aadb9] text-white'
				: 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'}"
			on:click={() => (activeTab = tab.id)}
		>
			{tab.name}
		</button>
	{/each}
</div>

<div class="border-gray-300 border-t-0 rounded-b-lg p-4">
	{#if activeTab === 'table_contents'}
		<slot name="table_contents" />
	{:else if activeTab === 'calc_contents'}
		<slot name="calc_contents" />
	{/if}
</div>
