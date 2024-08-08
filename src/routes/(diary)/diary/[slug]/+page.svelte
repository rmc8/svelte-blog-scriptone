<script lang="ts">
	import { page } from '$app/stores';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import ClockOutline from 'svelte-material-icons/ClockOutline.svelte';
	import Header from '$lib/components/dairy/SimpleHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Share from '$lib/components/share_component/Share.svelte';

	export let data;
	const post = data.post;
	$: currentUrl = $page.url.href;
</script>

<svelte:head>
	<title>Scriptone - {post.title.rendered}</title>
	<meta property="og:title" content="Scriptone - {post.title.rendered}" />
	<meta property="og:type" content="article" />
	{#if post.excerpt.rendered}
		<meta name="description" content={post.excerpt.rendered.replace(/<[^>]*>/g, '')} />
		<meta property="og:description" content={post.excerpt.rendered.replace(/<[^>]*>/g, '')} />
	{/if}
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<Header />

<main class="w-full">
	<article class="post flex flex-col justify-center items-center pb-12">
		<div class="container max-w-3xl mx-auto px-4">
            <div class="meta flex items-center text-sm text-gray-600 mb-6">
				<div class="flex items-center mr-4">
					<ClockOutline width={20} height={20} />
					<time class="ml-1">
						{new Date(post.date).toLocaleDateString('ja-JP', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit'
						})}
					</time>
				</div>
				{#if post.tags && post.tags.length > 0}
					<div class="flex items-center">
						<Tag width={20} height={20} />
						<span class="ml-1">{post.tags.join(', ')}</span>
					</div>
				{/if}
			</div>
			<h1 class="text-3xl font-bold mb-4">{post.title.rendered}</h1>
			<div class="content prose prose-lg max-w-none">
				{@html post.content.rendered}
			</div>
		</div>
	</article>
	<div class="container max-w-3xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
		<Share share_title={post.title.rendered} share_url={currentUrl} />
	</div>
</main>

<Footer />

<style>
	:global(.prose img) {
		margin-left: auto;
		margin-right: auto;
	}
</style>
