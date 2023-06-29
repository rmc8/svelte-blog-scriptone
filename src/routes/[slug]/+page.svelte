<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		const codeBlocks = document.querySelectorAll('code');
		codeBlocks.forEach((block) => {
			let mode;
			if (block.classList.contains('language-css')) {
				mode = 'css';
			} else if (block.classList.contains('language-html')) {
				mode = 'htmlmixed';
			} else if (block.classList.contains('language-javascript')) {
				mode = 'javascript';
			} else if (block.classList.contains('language-json')) {
				mode = 'json';
			} else if (block.classList.contains('language-markdown')) {
				mode = 'markdown';
			} else if (block.classList.contains('language-python')) {
				mode = 'python';
			} else if (block.classList.contains('language-rust')) {
				mode = 'rust';
			} else if (block.classList.contains('language-svelte')) {
				mode = 'svelte';
			} else if (block.classList.contains('language-vue')) {
				mode = 'htmlmixed';
			}
			CodeMirror.fromTextArea(block, {
				mode: mode,
				lineNumbers: true,
				readonly: true
			});
		});
	});
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
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.css"
	/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/css/css.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/htmlmixed/htmlmixed.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/javascript/javascript.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/json/json.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/markdown/markdown.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/python/python.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/rust/rust.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/svelte/svelte.min.js"
	></script>
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
	.eyecatch_block img {
		max-width: 400px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}

	pre {
		overflow-x: auto;
	}
</style>
