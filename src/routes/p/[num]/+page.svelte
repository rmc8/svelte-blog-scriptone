<script lang="ts">
	import Header from '../../../components/Header.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Articles from '../../../components/Articles.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let pagination: number[] = [];
	let currentPageNum: number;

	onMount(() => {
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
	<meta name="description" content="Home of Scriptone" />
	<meta name="robots" content="noindex" />
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
				<!-- {#if p === currentPageNum}
					<span>{p}</span>
				{:else} -->
				<a href={`/p/${p}`}>{p}</a>
				<!-- {/if} -->
			{/each}
		</div>
	</section>
</main>
<Footer />
