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
		<h1>About</h1>
		<div>
			<p>hoge</p>
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
