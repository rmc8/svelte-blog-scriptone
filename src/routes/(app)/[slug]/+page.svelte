<script lang="ts">
	import { page } from '$app/stores';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import TimeStamp from '$lib/components/common/TimeStamp.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TopicList from '$lib/components/BreadcrumbsListArticle.svelte';
	import type { Blog } from '$lib/microcms/microcms';
	import { load } from 'cheerio';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import './codeblock.css';
	import Share from '$lib/components/share_component/Share.svelte';
	import OtherPosts from '$lib/components/OtherPosts.svelte';
	import { onMount } from 'svelte';

	interface Props {
		data: {
		blog: Blog;
		recentPosts: Blog[];
		relatedPosts: Blog[];
	};
	}

	let { data }: Props = $props();

	let htmlContent = $state('');

	onMount(async () => {
		const html_text: string = await marked(data.blog.body_markdown);
		const cheerio$ = load(html_text);

		// コードブロックのハイライト
		cheerio$('pre code').each((_, elm) => {
			const result = hljs.highlightAuto(cheerio$(elm).text());
			cheerio$(elm).html(result.value);
			cheerio$(elm).addClass('hljs');
		});
		htmlContent = cheerio$.html();
	});

	let currentUrl = $derived($page.url.href);
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
				<div id="article">
					{@html htmlContent}
				</div>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</div>
	</article>
	<div class="container mt-16 pt-8 border-t border-gray-200" id="meta">
		<dl>
			<div class="upper flex items-start mt-2">
				<div class="category">
					<a class="category_link" href="/category/{data.blog.category.id}/1"
						>{data.blog.category.name}</a
					>
				</div>
				<div class="tags mb-1">
					{#each data.blog.tags as tag}
						<div class="tag mr-1 inline-flex">
							<div class="tag_icon mt-1">
								<Tag color="#009cac" width={20} height={20} />
							</div>
							<div class="tag_link">
								<a href="/tag/{tag.id}/1" class="block pt-1.5">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<TimeStamp dtStr={data.blog.createdAt} />
			</div>
		</dl>
		<Share share_title={data.blog.title} share_url={currentUrl} />
		<OtherPosts headerLabel="ほかの記事を見る" relatedPosts={data.relatedPosts} />
		<OtherPosts headerLabel="最新の記事を見る" relatedPosts={data.recentPosts} />
	</div>
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />
