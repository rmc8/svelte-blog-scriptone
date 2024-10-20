<script lang="ts">
	interface Props {
		activeTab: string;
		table_contents?: import('svelte').Snippet;
		calc_contents?: import('svelte').Snippet;
	}

	let { activeTab = $bindable(), table_contents, calc_contents }: Props = $props();

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
				? 'bg-[--accent-color-light] text-white'
				: 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'}"
			onclick={() => (activeTab = tab.id)}
		>
			{tab.name}
		</button>
	{/each}
</div>

<div class="border-gray-300 border-t-0 rounded-b-lg p-4">
	{#if activeTab === 'table_contents'}
		{@render table_contents?.()}
	{:else if activeTab === 'calc_contents'}
		{@render calc_contents?.()}
	{/if}
</div>
