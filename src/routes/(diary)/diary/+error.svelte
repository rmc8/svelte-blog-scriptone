<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/dairy/SimpleHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Scriptone - Error</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Header />
<div class="mb-16" />
<main class="container mx-auto px-4 py-12 max-w-2xl">
	<div class="error-box m-6" role="alert">
		<p class="text-gray-800">{$page.status}: {$page.error?.message}</p>
	</div>
	<p class="m-6">
		<a href="/diary/" class="hover:underline">トップに戻る</a>
	</p>
</main>

<Footer />

<style>
	main {
		line-height: 1.75;
	}
	.error-box {
		background: #f5f2e8;
		border: 5px solid #d4cfc0;
		color: #2f3017;
		border-radius: 8px;
		padding: 1rem;
	}
</style>
