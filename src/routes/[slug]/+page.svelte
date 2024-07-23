<script lang="ts">
	import { page } from '$app/stores';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import ClockOutline from 'svelte-material-icons/ClockOutline.svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import TopicList from '../../components/BreadcrumbsListArticle.svelte';
	import type { Blog } from '$lib/microcms';
	import { load } from 'cheerio';
	import hljs from 'highlight.js';
	import './codeblock.css';
	import Share from '../../components/share_component/Share.svelte';
	import OtherPosts from '../../components/OtherPosts.svelte';

	export let data: {
		blog: Blog;
		recentPosts: Blog[];
		relatedPosts: Blog[];
	};
	const cheerio$ = load(data.blog.content);

	// コードブロックのハイライト
	cheerio$('pre code').each((_, elm) => {
		const result = hljs.highlightAuto(cheerio$(elm).text());
		cheerio$(elm).html(result.value);
		cheerio$(elm).addClass('hljs');
	});

	// {{iframe style="..." src="..."}} 記法を HTML iframe に置換する
	const iframeRegex = /{{iframe style="([^"]+)" src="([^"]+)"}}/g;
	let htmlContent = cheerio$.html();
	htmlContent = htmlContent.replace(iframeRegex, (_, style, src) => {
		return `<iframe src="${src}" style="${style}" frameborder="0"></iframe>`;
	});

	const article = htmlContent;
	$: currentUrl = $page.url.href;
	export { article };
</script>

<svelte:head>
	<title>Scriptone - {data.blog.title}</title>
	<meta property="og:title" content="Scriptone - {data.blog.title}" />
	<meta property="og:type" content="article" />
	{#if data.blog.description}
		<meta name="”description”" content={data.blog.description} />
		<meta property="twitter:description" content={data.blog.description} />
		<meta property="og:description" content={data.blog.description} />
	{/if}
</svelte:head>

<Header />

<main class="w-full">
	<article class="post flex flex-col justify-center items-center pb-12">
		<div class="container">
			<h1>{data.blog.title}</h1>
			<TopicList blog={data.blog} />
			<div class="contents">
				<div class="eyecatch_block pb-8 w-full">
					<img
						src={data.blog.eyecatch}
						alt="eyecatch-{data.blog.title}"
						class="w-full max-w-[400px] mx-auto rounded-lg"
					/>
				</div>
				{@html article}
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</div>
	</article>
	<div class="container mt-16 pt-8 border-t border-gray-200" id="meta">
		<dl>
			<div class="upper flex items-start mt-2">
				<div class="category">
					<a class="category_link" href="/category/{data.blog.category.id}/p/1"
						>{data.blog.category.name}</a
					>
				</div>
				<div class="tags mb-1">
					{#each data.blog.tags as tag}
						<div class="tag mr-1 inline-flex">
							<div class="tag_icon mt-1">
								<Tag color="#00c0ce" width={20} height={20} />
							</div>
							<div class="tag_link">
								<a href="/tag/{tag.id}/p/1" class="block pt-1.5">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<div class="flex items-center">
					<div class="clock pt-1">
						<ClockOutline width={20} height={20} />
					</div>
					<time class="text-gray-600 ml-1">
						{new Date(data.blog.createdAt)
							.toLocaleString('ja-JP', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit'
							})
							.replace(/\//g, '-')}
					</time>
				</div>
			</div>
		</dl>
		<Share share_title={data.blog.title} share_url={currentUrl} />
		<OtherPosts headerLabel="ほかの記事を見る" relatedPosts={data.relatedPosts} />
		<OtherPosts headerLabel="最新の記事を見る" relatedPosts={data.recentPosts} />
	</div>
</main>
<Footer />

<style>
	table {
		border-collapse: collapse;
		width: auto;
		background-color: #fff;
		margin-top: 16px;
		margin-bottom: 16px;
		border-spacing: 0;
		border-radius: 4px;
		overflow: hidden;
	}
</style>
