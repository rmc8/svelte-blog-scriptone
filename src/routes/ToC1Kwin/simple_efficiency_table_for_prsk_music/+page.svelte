<script lang="ts">
	import Header from '../../../components/HeaderForPrsk.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Table from './Table.svelte';

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
    <meta name="twitter:image"
        content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg" />
    <meta property="og:image"
        content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg" />
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<Table />
		</div>
	</article>
</main>

<Footer />