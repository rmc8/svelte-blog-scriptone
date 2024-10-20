<script lang="ts">
	import type { Category } from '$lib/types/footer';
	interface Props {
		categories?: Category[];
	}

	let { categories = [] }: Props = $props();
</script>

<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Category</h3>
<ul>
	{#each categories as category}
		<li class="hover:bg-[--accent-color-light]">
			<a href="/category/{category.id}/1">{category.name} ({category.count})</a>
		</li>
	{/each}
</ul>
