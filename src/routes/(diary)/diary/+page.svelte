<script lang="ts">
	import Header from '$lib/components/dairy/SimpleHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long'
		});
	}
</script>

<svelte:head>
	<title>Scriptone - Diary</title>
	<meta name="description" content="ただのメモ書きです" />
	<meta name="robots" content="noindex, nofollow">
</svelte:head>

<Header />
<main class="container mx-auto px-4 py-12 max-w-2xl">
	<section id="articles" class="space-y-12">
		{#if data.posts && data.posts.length > 0}
			{#each data.posts as post}
				<article class="mb-8">
					<time class="text-sm text-gray-600 block mb-2" datetime={post.date}>
						{formatDate(post.date)}
					</time>
					<h2 class="text-2xl font-semibold mb-4 text-gray-800">{@html post.title.rendered}</h2>
					<div class="prose prose-sm text-gray-700 mb-4">{@html post.excerpt.rendered}</div>
					<a href="/diary/{post.slug}" class="readmore">続きを読む</a>
				</article>
			{/each}
		{:else}
			<p class="text-center text-gray-600 py-8">記事が見つかりませんでした。</p>
		{/if}
	</section>
	{#if data.posts && data.posts.length > 0}
		<nav class="mt-12 flex justify-between items-center">
			{#if data.currentPage > 1}
				<a href={`?page=${data.currentPage - 1}`} class="hover:underline">前のページ</a>
			{:else}
				<span />
			{/if}
			<span class="text-gray-600">ページ {data.currentPage} / {data.totalPages}</span>
			{#if data.currentPage < data.totalPages}
				<a href={`?page=${data.currentPage + 1}`} class="hover:underline">次のページ</a>
			{:else}
				<span />
			{/if}
		</nav>
	{/if}
</main>
<Footer />

<style>
	.readmore {
		color: var(--accent-color);
		border: var(--accent-color) 1px solid;
		padding: 0.2em 0.4em;
		border-radius: 4px;
	}
	.readmore:hover {
		color: var(--accent-color-light);
		border-color: var(--accent-color-light);
		transition: 0.33s;
	}
	main {
		line-height: 1.75;
	}

	article {
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 2rem;
	}

	article:last-child {
		border-bottom: none;
	}
</style>
