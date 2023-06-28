<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
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
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-coy.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autolinker/prism-autolinker.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/diff-highlight/prism-diff-highlight.min.css"
		rel="stylesheet"
	/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-diff.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autolinker/prism-autolinker.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/diff-highlight/prism-diff-highlight.min.js"
	></script>
	<script>
		document.addEventListener('DOMContentLoaded', (event) => {
			const codeElements = document.querySelectorAll('code');
			codeElements.forEach((code) => {
				code.classList.add('line-numbers');
			});
		});
	</script>
</svelte:head>

<main>
	<Header />
	<article>
		<div class="container">
			<h1>{data.title}</h1>
			<div class="contents">
				<div class="eyecatch_block">
					<img src={data.eyecatch} alt="eyecatch-{data.title}" />
				</div>
				{@html data.content}
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
							<div class="tag_link">
								<a href="/tag/{tag.id}/p/1">
									{tag.name}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<time
					>{new Date(data.createdAt)
						.toLocaleString('ja-JP', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						})
						.replace(/\//g, '-')}</time
				>
			</div>
		</dl>
	</div>
	<Footer />
</main>

<style>
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
		display: inline-block;
		height: 20px;
	}
	div.clock img {
		vertical-align: middle;
	}
	time {
		display: block;
		margin-left: 4px;
		height: 20px;
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

	div.upper a.category_link {
		padding: 2px 8px;
		border: 1px solid var(--accent-color-light);
		color: var(--accent-color-light);
		white-space: nowrap;
		border-radius: 3px;
		font-size: 14px;
		margin: 0 0 2px;
		vertical-align: top;
	}
	div.tag a {
		display: block;
		vertical-align: middle;
	}
	.tags {
		padding-left: 16px;
		flex-grow: 1;
		display: flexbox;
	}
	.tag_icon {
		padding-top: 5px;
		margin-right: 2px;
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

	pre {
		overflow-x: auto;
		scrollbar-color: var(--accent-color-light) #eeeeee;
	}


	pre::-webkit-scrollbar-track {
		background: #eeeeee;
	}

	pre::-webkit-scrollbar-thumb {
		background-color: var(--accent-color-light);
	}

	pre::-webkit-scrollbar-thumb:hover {
		background-color: #aaaaaa;
	}
</style>
