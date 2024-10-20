<script lang="ts">
	import { run } from 'svelte/legacy';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Articles from '$lib/components/Articles.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let visiblePages: (number | string)[] = $state([]);

	run(() => {
		const pages = Math.ceil(data.totalCount / 6);
		const currentPage = +data.currentPage;

		visiblePages = [];

		if (pages <= 9) {
			visiblePages = Array.from({ length: pages }, (_, i) => i + 1);
		} else {
			if (currentPage <= 5) {
				visiblePages = [1, 2, 3, 4, 5, 6, 7, '...', pages];
			} else if (currentPage > pages - 5) {
				visiblePages = [
					1,
					'...',
					pages - 6,
					pages - 5,
					pages - 4,
					pages - 3,
					pages - 2,
					pages - 1,
					pages
				];
			} else {
				visiblePages = [
					1,
					'...',
					currentPage - 2,
					currentPage - 1,
					currentPage,
					currentPage + 1,
					currentPage + 2,
					'...',
					pages
				];
			}
		}
	});

	function getPageUrl(page: number): string {
		const baseUrl = '/page';
		return `${baseUrl}/${page}`;
	}
</script>

<svelte:head>
	<title>Scriptone - Home</title>
	<meta
		name="description"
		content="Programmingや書写、オーディオなど多様な趣味を掲載したブログです。"
	/>
</svelte:head>

<Header />
<div class="mb-16"></div>
<main>
	<section id="articles">
		<ul>
			{#each data.contents as content}
				<Articles {content} />
			{/each}
		</ul>
		<div class="pagination">
			{#if +data.currentPage > 1}
				<a href={getPageUrl(+data.currentPage - 1)} class="nav-button" aria-label="前のページ">
					<ChevronLeft size="24px" />
				</a>
			{/if}

			{#each visiblePages as p}
				{#if typeof p === 'number'}
					{#if p === +data.currentPage}
						<span aria-current="page">{p}</span>
					{:else}
						<a href={getPageUrl(p)}>{p}</a>
					{/if}
				{:else}
					<span class="ellipsis">...</span>
				{/if}
			{/each}

			{#if +data.currentPage < Math.ceil(data.totalCount / 6)}
				<a href={getPageUrl(+data.currentPage + 1)} class="nav-button" aria-label="次のページ">
					<ChevronRight size="24px" />
				</a>
			{/if}
		</div>
	</section>
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
	}

	.pagination a,
	.pagination span {
		font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo,
			sans-serif;
		padding: 4px 8px;
		margin-right: 8px;
		text-align: center;
		border-radius: 5px;
		font-size: 14px;
		min-height: 24px;
		min-width: 16px;
		text-decoration: none;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100%;
	}

	.pagination a {
		background-color: var(--accent-color-light);
		color: white;
	}

	.pagination span {
		background-color: var(--accent-color-dark);
		color: white;
	}

	.pagination a:last-child,
	.pagination span:last-child {
		margin-right: 0;
	}

	.nav-button {
		background-color: transparent;
		width: 32px;
		height: 32px;
		color: var(--accent-color-dark);
	}

	.ellipsis {
		background-color: transparent;
		color: var(--text-color);
	}
</style>
