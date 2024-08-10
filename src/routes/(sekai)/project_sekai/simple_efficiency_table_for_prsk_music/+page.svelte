<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Table from './Table.svelte';

	$: currentUrl = $page.url.href;
	export let data;
</script>

<svelte:head>
	<title>Scriptone - プロセカ楽曲効率</title>
	<meta name="description" content="チアフルイベントの連勝のランキングを掲載しております。" />
	<meta name="twitter:site" content="@mskydev" />
	<meta name="twitter:creator" content="@mskydev" />
	<meta property="og:title" content="プロセカ楽曲効率" />
	<meta name="twitter:title" content="プロセカ楽曲効率" />
	<meta property="og:description" content="プロセカの楽曲効率を簡単にまとめた表です。" />
	<meta name="twitter:description" content="プロセカの楽曲効率を簡単にまとめた表です。" />
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<Table />
		</div>
		<div class="container">
			<Share share_title="プロセカ楽曲効率表" share_url={currentUrl} />
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>

<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />