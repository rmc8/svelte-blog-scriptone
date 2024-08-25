<script lang="ts">
	import { page } from '$app/stores';
	import Share from '../../../../lib/components/share_component/Share.svelte';
	import { onMount } from 'svelte';
	import type { ApiResponse } from './types/types';
	import Header from '../../../../lib/components/HeaderForPrsk.svelte';
	import Footer from '../../../../lib/components/Footer.svelte';
	import Profile from '../../../../lib/components/ProsekaProfile.svelte';
	import Tools from '../PrskTools.svelte';
	import Diff from './components/Difficuluties.svelte';
	import ByRarity from './components/card/ByRarity.svelte';
	import ByRarityVs from './components/card/ByRarityVs.svelte';
	import ByType from './components/card/ByType.svelte';
	import ByTypeVs from './components/card/ByTypeVs.svelte';
	import BySkill from './components/card/BySkill.svelte';
	import BySkillVs from './components/card/BySkillVs.svelte';

	$: currentUrl = $page.url.href;

	let api_data: ApiResponse | null = null;

	onMount(async () => {
		const url =
			'https://script.google.com/macros/s/AKfycbygdjvZvLOce6y6sUdVxGfi6n0myByoOuPZl1TrvRaUzgt-D0hipMaZOH57dMb9XTA1/exec';
		try {
			const response = await fetch(url);
			if (response.ok) {
				const jsonData = await response.json();
				api_data = jsonData as ApiResponse;
			} else {
				console.error('Error fetching data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	});
	export let data;
</script>

<svelte:head>
	<title>Scriptone - プロセカダッシュボード (PSD)</title>
	<meta name="description" content="プロセカダッシュボード" />
	<meta name="twitter:site" content="@rmc８_ret" />
	<meta name="twitter:creator" content="@rmc8_ret" />
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
					href="https://x.com/rmc8_ret">@rmc8_ret</a
				>にご連絡ください。
			</div>
			<h2>Project Sekai Dashboard (PSD)</h2>
			{#if api_data == null}
				<p>Now loading...</p>
			{/if}
			{#if api_data?.card != undefined}
				<div id="card">
					<h3>カード枚数</h3>
					<ByRarity rarityCounter={api_data.card.byRarity} />
					<ByRarityVs rarityCounter={api_data.card.byRarityForVs} />
					<ByType typeCounter={api_data.card.byType} />
					<ByTypeVs typeCounter={api_data.card.byTypeForVs} />
					<BySkill skillCounter={api_data.card.bySkill} />
					<BySkillVs skillCounter={api_data.card.bySkillForVs} />
				</div>
			{/if}
			{#if api_data?.diff != undefined}
				<div id="music">
					<h3>楽曲</h3>
					<Diff diffObj={api_data.diff} />
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

<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />

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
