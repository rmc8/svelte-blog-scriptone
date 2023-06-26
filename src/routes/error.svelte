<script lang="ts">
    import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>
<script context="module">
	export function load({ error }) {
		return { props: { status: error.status, message: error.message } };
	}
</script>

<script>
	export let status;
	export let message;
</script>


<svelte:head>
	<title>Scriptone - Error</title>
</svelte:head>

<main>
<Header />
    <h1>Error - {status}</h1>
    <p>{message}</p>

<Footer />
</main>
