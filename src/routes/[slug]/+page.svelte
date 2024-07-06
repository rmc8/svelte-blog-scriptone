<script lang="ts">
	import Tag from 'svelte-material-icons/Tag.svelte';
	import ClockOutline from 'svelte-material-icons/ClockOutline.svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import type { PageData } from './$types';
	import { load } from 'cheerio';
	import hljs from 'highlight.js';
	import './codeblock.css';

	export let data: PageData;
	const cheerio$ = load(data.content);

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
	export { article };
</script>

<svelte:head>
	<title>Scriptone - {data.title}</title>
	<meta property="og:title" content="Scriptone - {data.title}" />
	<meta property="og:type" content="article" />
	{#if data.description}
		<meta name="”description”" content={data.description} />
		<meta property="twitter:description" content={data.description} />
		<meta property="og:description" content={data.description} />
	{/if}
</svelte:head>
<Header />
<main class="w-full">
	<article class="post flex flex-col justify-center items-center">
		<div class="container">
			<h1>{data.title}</h1>
			<div class="contents">
				<div class="eyecatch_block pb-8 w-full">
					<img
						src={data.eyecatch}
						alt="eyecatch-{data.title}"
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
					<a class="category_link" href="/category/{data.category.id}/p/1">{data.category.name}</a>
				</div>
				<div class="tags mb-2">
					{#each data.tags as tag}
						<div class="tag pr-2 inline-flex">
							<div class="tag_icon mt-1">
								<Tag color="#0aadb9" width={20} height={20} />
							</div>
							<div class="tag_link">
								<a href="/tag/{tag.id}/p/1" class="block pt-1.5">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<div class="clock flex h-5">
					<div class="pt-1">
						<ClockOutline width={20} height={20} />
					</div>
					<time class="ml-1 text-gray-600">
						{new Date(data.createdAt)
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
	</div>
</main>
<Footer />
