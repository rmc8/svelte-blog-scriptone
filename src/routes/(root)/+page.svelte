<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Articles from '$lib/components/Articles.svelte';
	import type { PageData } from '../$types';
	import { beforeUpdate } from 'svelte';

	export let data: PageData;

	let pagination: number[] = [];
	let currentPageNum: number;

	beforeUpdate(() => {
		const slugNumber = parseInt(window.location.pathname.split('/').pop() || '1', 10);
		currentPageNum = isNaN(slugNumber) ? 1 : slugNumber;
	});

	$: {
		const pages = Math.ceil(data.totalCount / 6);
		pagination = Array.from({ length: pages }, (_, i) => i + 1);
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
<div class="mb-16" />
<main>
	<section id="articles">
		<ul>
			{#each data.contents as content}
				<Articles {content} />
			{/each}
		</ul>
		<div class="pagination">
			{#each pagination as p}
				<!-- {#if p === +currentPageNum}
					<span>{p}</span>
				{:else} -->
				<a href={`/p/${p}`}>{p}</a>
				<!-- {/if} -->
			{/each}
		</div>
	</section>
</main>
<Footer />
