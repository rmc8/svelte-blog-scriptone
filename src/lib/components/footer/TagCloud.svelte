<script lang="ts">
	import type { Tag } from '$lib/types/footer';
	interface Props {
		tags?: Tag[];
	}

	let { tags = [] }: Props = $props();

	function getTagColor(index: number) {
		const colors = [
			'#00c0ce',
			'#009cac',
			'#00747c',
			'#00a0b0',
			'#008890',
			'#609da2',
			'#006068',
			'#58b7bd',
			'#004c54'
		];
		return colors[index % colors.length];
	}
	function getTagSize(count: number) {
		const minSize = 10;
		const maxSize = 22;
		const maxCount = Math.max(...tags.map((t) => t.count));
		return minSize + (count / maxCount) * (maxSize - minSize);
	}
</script>

<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full mt-4">Tags</h3>
<div class="tag-cloud">
	{#each tags as tag, index}
		<a
			href="/tag/{tag.id}/1"
			class="tag-link"
			style="background-color: {getTagColor(index)}; font-size: {getTagSize(tag.count)}px;"
		>
			{tag.name} ({tag.count})
		</a>
	{/each}
</div>

<style>
	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		max-height: 888px;
		overflow-y: auto;
		padding: 10px;
		border-radius: 8px;
	}

	.tag-link {
		padding: 2px 10px;
		color: white;
		border-radius: 22px;
		text-decoration: none;
		transition: transform 0.3s ease, opacity 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.tag-link:hover {
		transform: scale(1.05);
		opacity: 0.9;
	}
</style>
