<script lang="ts">
	import Header from '../../../../../components/Header.svelte';
	import Footer from '../../../../../components/Footer.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let currentPageNum: number = 1;
	let tagSlug: string;

	onMount(() => {
		const parts = window.location.pathname.split('/');
		currentPageNum = Number(parts[parts.length - 1]) || 1;
		tagSlug = parts[parts.length - 3] || undefined;
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
						<a href="https://blog.rmc-8.com/{content.id}"
							><img src={content.eyecatch?.url} alt="eyecatch of {content.title}" />
						</a>
					</div>
					<dl>
						<dt><a href="https://blog.rmc-8.com/{content.id}">{content.title}</a></dt>
						<div class="upper" style="display:flex">
							<div class="category">
								<a class="category_link" href="https://blog.rmc-8.com/category/{content.category.id}/p/1"
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
											<a href="https://blog.rmc-8.com/tag/{tag.id}/p/1">
												{tag.name}
											</a>
										</div>
									</div>
								{/each}
							</div>
						</div>
						<dd>
							<div class="clock">
								<img src="../../../clock.png" width="20" height="20" alt="clock_icon" />
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
				<a href={`https://blog.rmc-8.com/tag/${tagSlug}/p/${p}`}>{p}</a>
				<!-- {/if} -->
			{/each}
		</div>
	</section>
	<Footer />
</main>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.eyecatch_section {
		height: 162px;
	}
	.eyecatch_section img {
		width: 360px;
		height: 100%;
		max-height: 162px;
		object-fit: cover;
		object-position: center;
	}

	dt a {
		color: #222;
		font-weight: bold;
		font-size: 22px;
		min-height: 72px;
		display: block;
	}
	main ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
		padding: 0;
	}

	main li {
		width: 360px;
		margin-right: 24px;
		margin-bottom: 48px;
		list-style: none;
		flex: 0 0 auto;
		max-width: px;
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
		display: inline-block;
		font-size: 18.5px;
		margin-left: 4px;
		height: 20px;
		vertical-align: top;
	}
	div.upper {
		display: flex;
		align-items: flex-start;
		margin-top: 8px;
		width: 360px;
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
	.tags {
		padding-left: 16px;
		flex-grow: 1;
		width: 100%;
		display: flexbox;
	}
	.tag_icon {
		padding-top: 5px;
		margin-right: 2px;
	}
	.tag_link {
		margin-right: 12px;
	}

	.pagination a {
		/* ,
	  .pagination span */
		padding: 4px 8px;
		margin-right: 4px;
		border: 1px solid var(--accent-color-light);
		text-align: center;
		border-radius: 4px;
		font-size: 14px;
		min-height: 24px;
		min-width: 16px;
	}
	.pagination a {
		background-color: var(--accent-color-light);
		color: white;
		text-decoration: none;
	}

	/* .pagination span {
	color: var(--accent-color-light);
	} */
</style>
