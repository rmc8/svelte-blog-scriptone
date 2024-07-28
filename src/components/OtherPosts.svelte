<script lang="ts">
	import ClockOutline from 'svelte-material-icons/ClockOutline.svelte';
	import { formatDate } from '$lib/utils';
	import type { Blog } from '$lib/microcms';

	export let headerLabel: string;
	export let relatedPosts: Blog[];
</script>

<section class="mt-12">
	<h2 class="font-bold mb-6">{headerLabel}</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each relatedPosts as post}
			<a href="/{post.id}" class="block hover:shadow-lg transition-shadow duration-300">
				<div class="card rounded-lg overflow-hidden shadow-md h-full flex flex-col">
					<div class="aspect-video w-full overflow-hidden">
						<div class="card-image-container">
							<img src={post.eyecatch} alt={post.title} class="card-image" />
						</div>
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
	a {
		color: var(--accent-color-light);
	}
	a:hover{
		color: var(--accent-color);
	}
	.card {
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
	}

	.card-image-container {
		width: 100%;
		height: 0;
		padding-bottom: 56.29%; /* 197 / 350 * 100 */
		position: relative;
		overflow: hidden;
	}

	.card-image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card {
		border-radius: 0.5rem;
		background-color: #fefcf4; /* #ffffff */
	}

	.card img {
		border-radius: 0;
	}

	/* 既存のスタイルはそのまま保持 */
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
