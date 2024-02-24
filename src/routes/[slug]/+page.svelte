<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import type { PageData } from './$types';
	import { load } from 'cheerio';
	import hljs from 'highlight.js';
	import "./codeblock.css";

	export let data: PageData;
	let existsCodeBlock = false;
	const cheerio$ = load(data.content);

	// コードブロックのハイライト
	cheerio$('pre code').each((_, elm) => {
		const result = hljs.highlightAuto(cheerio$(elm).text());
		cheerio$(elm).html(result.value);
		cheerio$(elm).addClass('hljs');
		existsCodeBlock = true;
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
	{#if existsCodeBlock}
		<link href="/css/codeblock.css" rel="stylesheet" />
	{/if}
</svelte:head>

<Header />
<main>
	<article class="post">
		<div class="container">
			<h1>{data.title}</h1>
			<div class="contents">
				<div class="eyecatch_block pb-8">
					<img src={data.eyecatch} alt="eyecatch-{data.title}" />
				</div>
				{@html article}
			</div>
		</div>
	</article>
	<div class="container" id="meta">
		<dl>
			<div class="upper" style="display:flex">
				<div class="category">
					<a class="category_link" href="/category/{data.category.id}/p/1">{data.category.name}</a>
				</div>
				<div class="tags">
					{#each data.tags as tag}
						<div class="tag">
							<div class="tag_icon">
								<img class="tag_icon" src="/logo/tag.svg" width="20" height="20" alt="tag_icon" />
							</div>
							<div class="tag_link">
								<a href="/tag/{tag.id}/p/1">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<div class="clock">
					<img src="/clock.webp" width="20" height="20" alt="clock_icon" />
					<time style="color:#666">
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

<style lang="postcss">
	* {
		box-sizing: border-box;
	}
	main {
		width: 100%;
	}
	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	dl {
		margin-top: 6px;
	}
	dd {
		margin-left: 0px;
		margin-top: 2px;
		height: 20px;
	}
	div.clock {
		display: flex;
		height: 20px;
	}
	div.clock img {
		vertical-align: bottom;
		padding-top: 4px;
		width: 20px;
		height: 24px;
	}
	time {
		margin-left: 4px;
		vertical-align: top;
	}
	div.upper {
		display: flex;
		align-items: flex-start;
		margin-top: 8px;
	}

	div.tag {
		display: inline-flex;
	}
	div.tag a {
		display: block;
		vertical-align: middle;
		padding-top: 6px;
	}

	.tags {
		margin-bottom: 8px;
	}
	time {
		color: #666;
	}
	.tag_icon {
		width: 22px;
		height: 22px;
	}
	.tag_link {
		margin-right: 12px;
	}

	#meta {
		margin-top: 64px;
		padding-top: 32px;
		border-top: 1px solid #eeeeee;
	}
	.eyecatch_block,
	.eyecatch_block img {
		width: 100%;
	}
	.eyecatch_block img {
		max-width: 400px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
</style>
