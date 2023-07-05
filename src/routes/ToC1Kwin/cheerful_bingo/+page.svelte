<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import Header from '../../../components/Header.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Gallery from './Gallery.svelte';
</script>

<svelte:head>
	<title>Scriptone - プロセカ チアフルビンゴ</title>
	<meta name="description" content="チアフルイベントの連勝のランキングを掲載しております。" />
	<meta name="twitter:site" content="@ToC1Kwin" />
	<meta name="twitter:creator" content="@ToC1Kwin" />
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
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<Gallery />
		</div>
	</article>
</main>

<Footer />

