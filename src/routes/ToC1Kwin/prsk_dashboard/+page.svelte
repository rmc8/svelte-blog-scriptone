<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../components/share_component/Share.svelte';
	import { onMount } from 'svelte';
	import type { ApiResponse } from './types/types';
	import Header from '../../../components/HeaderForPrsk.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Profile from '../../../components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Diff from './components/Difficuluties.svelte';
	import ByRarity from './components/card/ByRarity.svelte';
	import ByRarityVs from './components/card/ByRarityVs.svelte';
	import ByType from './components/card/ByType.svelte';
	import ByTypeVs from './components/card/ByTypeVs.svelte';
	import BySkill from './components/card/BySkill.svelte';
	import BySkillVs from './components/card/BySkillVs.svelte';

	$: currentUrl = $page.url.href;

	let data: ApiResponse | null = null;

	onMount(async () => {
		const url =
			'https://script.google.com/macros/s/AKfycbwJS0vNcUFGzV0C4lGVZevGdeCC_8-APg5goLZ_drO2wE4wFW0_8vXUbbQfizNQaNh3/exec';
		try {
			const response = await fetch(url);
			if (response.ok) {
				const jsonData = await response.json();
				data = jsonData as ApiResponse;
			} else {
				console.error('Error fetching data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	});
</script>

<svelte:head>
	<title>Scriptone - プロセカダッシュボード (PSD)</title>
	<meta name="description" content="プロセカダッシュボード" />
	<meta name="twitter:site" content="@mskydev" />
	<meta name="twitter:creator" content="@mskydev" />
	<meta property="og:title" content="プロセカダッシュボード" />
	<meta name="twitter:title" content="プロセカダッシュボード" />
	<meta property="og:description" content="プロセカ関連のデータを図表化したページです。" />
	<meta name="twitter:description" content="プロセカ関連のデータを図表化したページです。" />
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
			<div class="alert alert-warning" role="alert">
				現在、本ダッシュボードは開発中です。カード枚数のまとめなど実装予定ですが何かまとめて欲しい情報などありましたら<a
					href="https://x.com/mskydev">@mskydev</a
				>にご連絡ください。
			</div>
			<h2>Project Sekai Dashboard (PSD)</h2>
			{#if data == null}
				<p>Now loading...</p>
			{/if}
			{#if data?.card != undefined}
				<div id="card">
					<h3>カード枚数</h3>
					<ByRarity rarityCounter={data.card.byRarity} />
					<ByRarityVs rarityCounter={data.card.byRarityForVs} />
					<ByType typeCounter={data.card.byType} />
					<ByTypeVs typeCounter={data.card.byTypeForVs} />
					<BySkill skillCounter={data.card.bySkill} />
					<BySkillVs skillCounter={data.card.bySkillForVs} />
				</div>
			{/if}
			{#if data?.diff != undefined}
				<div id="music">
					<h3>楽曲</h3>
					<Diff diffObj={data.diff} />
				</div>
			{/if}
		</div>
		<div class="container">
			<Share share_title="プロセカダッシュボード(Alpha)" share_url={currentUrl} />
		</div>
		<div class="container">
			<Tools />
			<h2>Profile</h2>
			<Profile />
		</div>
	</article>
</main>

<Footer />

<style>
	.alert a {
		color: #007bff;
		text-decoration: none;
		background-color: transparent;
	}
	.alert {
		position: relative;
		padding: 0.75rem 1.25rem;
		margin-bottom: 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
	}

	.alert-warning {
		color: #856404;
		background-color: #fff3cd;
		border-color: #ffeeba;
	}
</style>
