<script lang="ts">
	let pagination : number[] = [];
	let currentPageNum = 0;
</script>

<div class="pagination">
	{#each pagination as p}
		{#if p === currentPageNum}
			<span>{p}</span>
		{:else}
			<a href={`?page=${p}`}>{p}</a>
		{/if}
	{/each}
</div>

<style>
	.pagination a,
	.pagination span {
		display: inline-block;
		padding: 4px 8px;
		margin-right: 4px;
		border: 1px solid var(--accent-color-light);
		text-align: center;
		border-radius: 4px;
		font-size: 14px;
		min-height: 24px;
		min-width: 16px;
	}
	.pagination a {
		background-color: var(--accent-color-light);
		color: white;
		text-decoration: none;
	}

	.pagination span {
		color: var(--accent-color-light);
	}
</style>
