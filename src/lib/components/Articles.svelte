<script lang="ts">
	import Tag from 'svelte-material-icons/Tag.svelte';
	import TimeStamp from './common/TimeStamp.svelte';
	import ClockOutline from 'svelte-material-icons/ClockTimeThree.svelte';
	import type { Blog } from '$lib/microcms/microcms';
	interface Props {
		content: Blog;
	}

	let { content }: Props = $props();
</script>

<li class="card transition-all duration-300 ease-in-out hover:shadow-hover">
	<div class="card-content">
		<div class="eyecatch_section">
			<a href="/{content.id}">
				<div class="card-image-container">
					<img src={content.eyecatch} alt="eyecatch of {content.title}" class="card-image" />
				</div>
			</a>
		</div>
		<div class="article_info p-4">
			<div class="article_link"><a class="title" href="/{content.id}">{content.title}</a></div>
			<div class="upper flex">
				<div class="category">
					<a class="category_link" href="/category/{content.category.id}/1" rel="external"
						>{content.category.name}</a
					>
				</div>
				<div class="tags">
					{#each content.tags as tag}
						<div class="tag inline-flex">
							<div class="tag_icon">
								<Tag color="#009cac" />
							</div>
							<div class="tag_link">
								<a href="/tag/{tag.id}/1">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex items-center pb-2">
				<TimeStamp dtStr={content.createdAt} />
			</div>
		</div>
	</div>
</li>

<style lang="postcss">
	.title {
		font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo,
			sans-serif;
	}
	.card {
		@apply rounded-lg bg-[#fefcf4] overflow-hidden shadow-md;
	}

	.card-content {
		@apply flex flex-col;
	}

	.card-image-container {
		@apply w-full relative overflow-hidden;
		padding-top: 56.29%;
	}

	.card-image {
		@apply absolute top-0 left-0 w-full h-full object-cover;
	}

	.eyecatch_section {
		@apply overflow-hidden rounded-t-lg;
	}

	@keyframes hover-shadow {
		0% {
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		}
		100% {
			box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		}
	}

	.card:hover {
		animation: hover-shadow 0.3s ease-in-out forwards;
	}

	.eyecatch_section {
		@apply overflow-hidden;
		border-top-left-radius: 0.5rem; /* 8px */
		border-top-right-radius: 0.5rem; /* 8px */
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.card-image {
		@apply absolute top-0 left-0 w-full h-full object-cover;
		border-top-left-radius: 0.5rem; /* 8px */
		border-top-right-radius: 0.5rem; /* 8px */
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
