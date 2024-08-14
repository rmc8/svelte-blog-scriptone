<script lang="ts">
	import type { PostCount } from '$lib/types/footer';
	export let postCounts: PostCount[] = [];
</script>

<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Archive</h3>
<ul>
	{#each postCounts as postCount}
		{#if /^\d{4}-\d{2}$/.test(postCount.yearMonth)}
			<li class="transition-colors duration-500 hover:bg-[--accent-color-light]">
				<a href="/archive/{postCount.yearMonth}/1">{postCount.yearMonth} ({postCount.count})</a>
			</li>
		{/if}
	{/each}
</ul>
