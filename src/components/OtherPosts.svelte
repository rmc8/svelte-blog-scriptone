<script lang="ts">
	import ClockOutline from 'svelte-material-icons/ClockOutline.svelte';
	import { formatDate } from '$lib/utils';
	import type { Blog } from '$lib/microcms';

	export let relatedPosts: Blog[];
</script>

<section class="mt-12">
	<h2 class="font-bold mb-6">ほかの記事を見る</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each relatedPosts as post}
			<a href="/{post.id}" class="block hover:shadow-lg transition-shadow duration-300">
				<div class="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
					<div class="aspect-video w-full overflow-hidden">
						<img
							src={post.eyecatch}
							alt={post.title}
							class="w-full h-full object-cover object-center"
						/>
					</div>
					<div class="p-4 flex-grow flex flex-col">
						<h3 class="text-lg font-semibold mb-2 line-clamp-2 flex-grow">{post.title}</h3>
						<p class="text-sm text-gray-600 mb-2">{post.category.name}</p>
						<div class="flex items-center text-xs text-gray-500">
							<ClockOutline width={16} height={16} />
							<time class="ml-1">
								{formatDate(post.updatedAt)}
							</time>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
