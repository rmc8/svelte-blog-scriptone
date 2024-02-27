<script lang="ts">
	import Header from '../../../../../components/Header.svelte';
	import Footer from '../../../../../components/Footer.svelte';
	import Articles from '../../../../../components/Articles.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let n: number;
	let currentPageNum: number;
	let categorySlug: string | undefined;
	let pagination: number[] = [];

	onMount(() => {
		const parts = window.location.pathname.split('/');
		currentPageNum = Number(parts[parts.length - 1]) || 1;
		categorySlug = parts[parts.length - 3] || undefined;
	});

	$: {
		const pages = Math.ceil(data.totalCount / 6);
		pagination = Array.from({ length: pages }, (_, i) => i + 1);
	}


</script>

<svelte:head>
	<title>Scriptone</title>
	<meta name="description" content="Home of Scriptone" />
	<meta name="robots" content="noindex" />
</svelte:head>

<Header />
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
				<a href={`/category/${categorySlug}/p/${p}`}>{p}</a>
				<!-- {/if} -->
			{/each}
		</div>
	</section>
</main>
<Footer />
