<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
	<title>Scriptone - About</title>
	<meta name="description" content="Detail Pages" />
</svelte:head>

<main>
	<Header />
	<article>
		<div class="container">
			<h1>About</h1>
			<div>
				<p>[WIP] 頑張って書きます(2023/06/25)</p>
			</div>
		</div>
	</article>
	<Footer />
</main>

<style>
	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
