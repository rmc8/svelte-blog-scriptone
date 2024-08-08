<script lang="ts">
	import { page } from '$app/stores';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import Calendar from 'svelte-material-icons/Calendar.svelte';
	import Header from '$lib/components/dairy/SimpleHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Share from '$lib/components/share_component/Share.svelte';

	export let data;
	const post = data.post;
	$: currentUrl = $page.url.href;
</script>

<svelte:head>
	<title>Scriptone - {post.title}</title>
	<meta property="og:title" content="Scriptone - {post.title}" />
	<meta property="og:type" content="article" />
	{#if post.meta.description}
		<meta name="description" content={post.meta.description} />
		<meta property="og:description" content={post.meta.description} />
	{/if}
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Header />

<main class="w-full">
	<article class="post flex flex-col justify-center items-center pb-12">
		<div class="container max-w-3xl mx-auto px-4">
			<div class="meta flex items-center text-sm text-gray-600 mb-6">
				<div class="flex items-center mr-4">
					<Calendar width={20} height={20} />
					<time class="ml-1">
						{new Date(post._sys.createdAt).toLocaleString('ja-JP', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</time>
				</div>
				{#if post.tags && post.tags.length > 0}
					<div class="flex items-center">
						<Tag width={20} height={20} />
						<span class="ml-1">{post.tags.map((tag) => tag.name).join(', ')}</span>
					</div>
				{/if}
			</div>
			<h1 class="text-3xl font-bold mb-4">{post.title}</h1>
			<div class="content prose prose-lg max-w-none">
				{@html post.body}
			</div>
		</div>
		<div class="container max-w-3xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
			<Share share_title={post.title} share_url={currentUrl} />
		</div>
	</article>
</main>

<Footer />

<style>
	.content {
		padding-bottom: 32px;
		font-size: 18px;
		line-height: 1.8em;
	}

	:global(.prose img) {
		margin-left: auto;
		margin-right: auto;
	}
	:global(p, blockquote) {
		margin-bottom: 32px;
	}
	:global(blockquote p:last-child) {
		margin-bottom: 0;
	}
</style>
