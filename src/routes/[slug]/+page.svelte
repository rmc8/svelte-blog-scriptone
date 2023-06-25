<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Scriptone - {data.title}</title>
	<meta name="description" content="Detail Pages" />
</svelte:head>

<main>
	<Header />
	<article>
		<div class="container">
			<h1>{data.title}</h1>
			<img src={data.eyecatch?.url} alt="eyecatch-{data.title}" />
			<div class="contents">
				{@html data.content}
			</div>
		</div>
	</article>
	<div class="container" id="meta">
		<dl>
			<div class="upper" style="display:flex">
				<div class="category">
					<a class="category_link" href="http://localhost:5173/category/{data.category.id}"
						>{data.category.name}</a
					>
				</div>
				<div class="tags">
					{#each data.tags as tag}
						<div class="tag">
							<div class="tag_link">
								<a
									href="http://localhost:5173/tag/{tag.id}"
									on:click={() => {
										location.reload();
									}}
								>
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
</style>
