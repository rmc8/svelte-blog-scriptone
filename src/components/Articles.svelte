<script lang="ts">
	type Blog = {
		title: string;
		id: string;
		eyecatch: string;
		category: {
			id: string;
			name: string;
		};
		tags: [
			{
				id: string;
				name: string;
			}
		];
		createdAt: string;
	};
	export let content: Blog;
</script>

<li>
	<div class="eyecatch_section">
		<a href="/{content.id}">
			<!-- <img src={content.eyecatch?.url} alt="eyecatch of {content.title}" /> -->
			<img src={content.eyecatch} alt="eyecatch of {content.title}" />
		</a>
	</div>
	<div class="article_info">
		<div class="article_link"><a href="/{content.id}">{content.title}</a></div>
		<div class="upper" style="display:flex">
			<div class="category">
				<a class="category_link" href="/category/{content.category.id}/p/1" rel="external"
					>{content.category.name}</a
				>
			</div>
			<div class="tags">
				{#each content.tags as tag}
					<div class="tag">
						<div class="tag_icon">
							<img src="/logo/tag.svg" width="20" height="20" alt="tag_icon" />
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
		<div class="clock">
			<img src="/clock.webp" width="20" height="20" alt="clock_icon" />
		</div>
		<time style="color:#666">
			{new Date(content.createdAt)
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
</li>
