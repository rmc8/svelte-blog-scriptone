<script lang="ts">
	import AchieveMenu from './footer/AchieveMenu.svelte';
	import CategoryList from './footer/CategoryList.svelte';
	import TagCloud from './footer/TagCloud.svelte';
	import FooterProfile from './footer/FooterProfile.svelte';
	import InternalLink from './footer/InternalLink.svelte';
	import ExternalLink from './footer/ExternalLink.svelte';
	import BuyMeACoffee from './footer/BuyMeACoffee.svelte';
	import type { Category, Tag, PostCount } from '$lib/types/footer';

	interface Props {
		categories?: Category[];
		tags?: Tag[];
		postCounts?: PostCount[];
	}

	let { categories = [], tags = [], postCounts = [] }: Props = $props();

	let windowWidth: number = $state();

	let columnClass =
		$derived(windowWidth >= 1328 ? 'lg:w-[31%]' : windowWidth >= 904 ? 'md:w-[46%]' : 'w-full');
</script>

<svelte:window bind:innerWidth={windowWidth} />

<footer class="mt-16 border-t border-[#eff3f3] text-center px-4 pt-16 pb-32">
	<h2 class="sr-only">サイトマップ</h2>
	<div class="container">
		<div id="sitemap" class="flex flex-wrap justify-start items-start">
			<section
				id="profile"
				class="{columnClass} p-2 ml-0 md:ml-5 mb-8 text-left flex flex-col items-center"
				aria-label="プロフィールとメニュー"
			>
				<FooterProfile />
				<AchieveMenu {postCounts} />
				<CategoryList {categories} />
			</section>

			<section class="{columnClass} p-2 ml-0 md:ml-5 mb-8 text-left" aria-label="リンクとサポート">
				<InternalLink />
				<ExternalLink />
				<BuyMeACoffee />
			</section>

			<section class="{columnClass} p-4 ml-0 md:ml-5 mb-8 text-left" aria-label="タグクラウド">
				<TagCloud {tags} />
			</section>
		</div>
	</div>
	<div class="container">
		<p class="text-center">&copy;{new Date().getFullYear()} - Scriptone</p>
	</div>
</footer>

<style>
	footer :global(h3) {
		padding-bottom: 8px;
	}
	footer :global(ul),
	footer :global(div) {
		width: 100%;
	}

	footer :global(section ul li) {
		list-style: none;
		padding: 10px;
		border-radius: 5px;
		margin-left: 0;
		margin-bottom: 0;
		width: 100%;
		transition: all 750ms ease;
	}

	footer :global(section ul li a) {
		text-decoration: none;
		display: block;
		width: 100%;
		height: 100%;
		color: inherit;
	}

	footer :global(section ul li:hover) {
		background-color: var(--accent-color-light);
	}

	footer :global(section ul li:hover a) {
		color: white;
	}
</style>
