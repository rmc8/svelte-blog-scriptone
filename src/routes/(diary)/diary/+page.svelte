<script lang="ts">
	import Header from '$lib/components/dairy/SimpleHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Calendar from 'svelte-material-icons/Calendar.svelte';

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

	function truncateAndStripHtml(html: string, maxLength: number = 160): string {
		// HTMLタグを除去
		const text = html.replace(/<[^>]*>/g, '');
		// 見出しタグ（h1-h6）とその内容を除去
		const withoutHeadings = text.replace(/<h[1-6].*?<\/h[1-6]>/g, '');
		// 最大文字数まで切り詰める
		return withoutHeadings.length > maxLength
			? withoutHeadings.slice(0, maxLength) + '...'
			: withoutHeadings;
	}
</script>

<svelte:head>
	<title>Scriptone - Diary</title>
	<meta name="description" content="ただのメモ書きです" />
</svelte:head>

<Header />
<div class="mb-16" />
<main class="container mx-auto px-4 py-12 max-w-2xl">
	<section id="articles" class="space-y-12">
		{#if data.posts && data.posts.length > 0}
			{#each data.posts as post}
				<article class="mb-8">
					<div class="flex items-center text-sm mb-2">
						<Calendar size="22" />
						<time class="ml-2" datetime={post._sys.createdAt}>
							{formatDate(post._sys.createdAt)}
						</time>
					</div>
					<h2 class="text-2xl font-semibold mb-4">{post.title}</h2>
					<div class="prose prose-sm text-gray-700 mb-4">
						{truncateAndStripHtml(post.body)}
					</div>
					<a href="/diary/{post._id}" class="readmore">続きを読む</a>
				</article>
			{/each}
		{:else}
			<p class="text-center py-8">記事が見つかりませんでした。</p>
		{/if}
	</section>
	{#if data.posts && data.posts.length > 0}
		<nav class="mt-12 flex justify-between items-center">
			{#if data.currentPage > 1}
				<a href={`?page=${data.currentPage - 1}`} class="hover:underline">前のページ</a>
			{:else}
				<span />
			{/if}
			<span>ページ {data.currentPage} / {data.totalPages}</span>
			{#if data.currentPage < data.totalPages}
				<a href={`?page=${data.currentPage + 1}`} class="hover:underline">次のページ</a>
			{:else}
				<span />
			{/if}
		</nav>
	{/if}
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />

<style>
	main {
		line-height: 1.75;
	}
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

	article {
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 2rem;
	}

	article:last-child {
		border-bottom: none;
	}
</style>
