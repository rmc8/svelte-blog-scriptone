<script lang="ts">
	import Header from '../../../../../components/Header.svelte';
	import Footer from '../../../../../components/Footer.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let currentPageNum: number = 1;
	let categorySlug: string;

	onMount(() => {
		const parts = window.location.pathname.split('/');
		currentPageNum = Number(parts[parts.length - 1]) || 1;
		categorySlug = parts[parts.length - 3] || undefined;
	});

	$: {
		const pages = Math.ceil(data.totalCount / 6);
		pagination = Array.from({ length: pages }, (_, i) => i + 1);
	}

	let pagination: number[] = [];
</script>

<svelte:head>
	<title>Scriptone</title>
	<meta name="description" content="Home of Scriptone" />
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<Header />

	<section id="articles">
		<ul>
			{#each data.contents as content}
				<li>
					<div class="eyecatch_section">
						<a href="/{content.id}">
							<!-- <img src={content.eyecatch?.url} alt="eyecatch of {content.title}" /> -->
							<img src={content.eyecatch} alt="eyecatch of {content.title}" />
						</a>
					</div>
					<dl>
						<dt><a href="/{content.id}">{content.title}</a></dt>
						<div class="upper" style="display:flex">
							<div class="category">
								<a class="category_link" href="/category/{content.category.id}/p/1"
									>{content.category.name}</a
								>
							</div>
							<div class="tags">
								{#each content.tags as tag}
									<div class="tag">
										<div class="tag_icon">
											<img src="../../../tag.svg" width="20" height="20" alt="tag_icon" />
										</div>
										<div class="tag_link">
											<a href="/tag/{tag.id}/p/1">
												{tag.name}
											</a>
										</div>
									</div>
								{/each}
							</div>
						</div>
						<dd>
							<div class="clock">
								<img src="../../../clock.webp" width="20" height="20" alt="clock_icon" />
							</div>
							<time
								>{new Date(content.createdAt)
									.toLocaleString('ja-JP', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit'
									})
									.replace(/\//g, '-')}</time
							>
						</dd>
					</dl>
				</li>
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
	<Footer />
</main>
