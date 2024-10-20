<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Gallery from './Gallery.svelte';
	import Tools from '../PrskTools.svelte';
	let currentUrl = $derived($page.url.href);
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Scriptone - プロセカ チアフルビンゴ</title>
	<meta name="description" content="チアフルイベント用のビンゴカードを配布しております。" />
	<meta name="twitter:site" content="@mskydev" />
	<meta name="twitter:creator" content="@mskydev" />
	<meta name="twitter:title" content="Cheerful Bingo" />
	<meta property="og:title" content="Cheerful Bingo" />
	<meta property="og:url" content="https://rmc8.github.io/ToC1Kwin/cheerful_bingo/" />
	<meta
		name="twitter:description"
		content="プロセカのチアフルイベント用にビンゴカードをランダムで配布するページです。"
	/>
	<meta
		property="og:description"
		content="プロセカのチアフルイベント用にビンゴカードをランダムで配布するページです。"
	/>
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<Gallery />
		</div>
		<div class="container">
			<Share share_title="Cheerful Bingo" share_url={currentUrl} />
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>

<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />
